<?php
/**
Set of utilities to run external program from PHP, check it status and kill by timeout
 */

require_once "env.php";


ps_cleanup_old_runs();
$ps_active_pid = false;


function ps_exec_bg($command, $output_file, &$pid)
{
    global $verbose;
    $full_command = "$command > $output_file  2>&1";
    $pid = ps_exec_get_pid($full_command, "b>");
    if ($pid === false) {
        return "[failed to run process]";
    } else {
        if ($verbose) print("[pid:$pid]\n");

        //save command name to tmp file to stop it on next run if found
        global $tc_agent_name;
        file_put_contents("/tmp/$tc_agent_name.pidc", "$pid\n$command");
    }
    return null;
}

function ps_exec_and_check($command, &$output = "", &$exit_code = 0, $halt_tokens = array(), $timeout = 60, $sleep = 1)
{
    global $verbose, $use_remote, $tmp_dir;

    $output_file = "exec_and_check_output.tmp.log";
    if ($use_remote) {
        $output_file = "$tmp_dir/$output_file";
    } else {
        $output_file = getcwd() . "/$output_file";
        $output_file = str_replace('\\', '/', $output_file); //fix windows slashes
    }
    $full_command = "$command > $output_file  2>&1";

    //todo:
    $exit_code = 0;
    // First, execute the process, get the process ID
    $pid = ps_exec_get_pid($full_command, "c>", " [timeout: $timeout seconds]");
    if ($pid === false) {
        return "[failed to run process]";
    }
    if ($verbose) print("[pid:$pid]\n");

    //save command name to tmp file to stop it on next run if found
    global $tc_agent_name;
    file_put_contents("/tmp/$tc_agent_name.pidc", "$pid\n$command");
    global $ps_active_pid;
    $ps_active_pid = $pid;


    $cur = 0;
    $output_file_pos = 0;
    $last_out = 0;
    $err = null;
    $ps_check = true;
    $prev_tail = "";
    $halt_tokens = wrap_to_array($halt_tokens);
    $max_halt_token_length = max_string_length($halt_tokens);
    $check_halt = count($halt_tokens) > 0;

    // when halt message is found, do not exit immediately but wait for max_loops_in_halt_state iterations more
    // to get the whole output
    $loops_in_halt_state = 0;
    $max_loops_in_halt_state = 2;

    // Second, loop for $timeout seconds checking if process is running
    while ($err == null) {
        if ($cur > $timeout && $timeout > 0) {
            $err = "[TIMEOUT]";
            break;
        }
        sleep($sleep);
        //pcntl_signal_dispatch();
        $cur += $sleep;

        //In verbose mode dump process output
        if ($verbose || $check_halt > 0) {
            clearstatcache(true, $output_file);
            $tail = ps_file_tail($output_file, $output_file_pos);
            if (strlen($tail) > 0) {
                if ($verbose) print($tail);

                if ($check_halt) {
                    if ($loops_in_halt_state > 0) {
                        $loops_in_halt_state++;
                        if ($loops_in_halt_state > $max_loops_in_halt_state) {
                            break;
                        }
                    }
                    $ps_out = $prev_tail . $tail;
                    foreach ($halt_tokens as $ht) {
                        //echo "[look for $ht in \n$ps_out\n]\n";
                        if (strpos($ps_out, $ht) != false) {
                            //echo "FOUND CRASH!\n";
                            $err = "[Found halt token in output: $ht]";
                            $loops_in_halt_state = 1;
                        }
                    }
                    $len_to_keep = min(strlen($ps_out), $max_halt_token_length);
                    $prev_tail = substr($ps_out, strlen($ps_out) - $len_to_keep);
                }
                $last_out = $cur;
            }
            if ($cur - $last_out > 30) {
                print("[ping process: $pid]\n");
                $last_out = $cur;
            }
        }

        // If process is no longer running, return true;
        if (!ps_exists($pid, false)) {
            $ps_check = false;
            break;
        }
    }
    // If process is still running after timeout, kill the process and return false
    if ($ps_check && ps_exists($pid, false)) {
        ps_kill($pid, false);
    }
    $ps_active_pid = false;
    if ($err == null) {
        $output_file_pos = 0; //reread file from start
        $output = ps_file_tail($output_file, $output_file_pos);
    }
    ps_exec("rm $output_file");
    return $err;
}


function ps_exec_get_pid($command, $verbose_prefix = "", $verbose_suffix = "")
{
    global $use_remote, $remote_host, $remote_user, $verbose, $tmp_dir;

    $full_command = $command;
    if ($use_remote) {
        $full_command = "ssh -t -t $remote_user@$remote_host \"$full_command\" >/dev/null 2>&1";
    }
    $full_command = "$full_command & echo $!";

    if (is_windows()) {
        $full_command = "bash -c \"$full_command\"";
    }

    if ($verbose) print("$verbose_prefix$full_command$verbose_suffix\n");

    $last_line = exec($full_command);
    $pid = (int)$last_line;

    if ($pid != "") {
        return $pid;
    }

    return false;
}

function ps_exists($pid, $auto_remote)
{
    global $verbose;
    $output = ps_exec("ps ax | grep $pid 2>&1", $auto_remote);
    $lines = explode("\n", $output);
    foreach ($lines as $line) {
        $clean_line = trim($line);
        $row_array = explode(" ", $clean_line);
        $check_pid = $row_array[0];

        if ($pid == $check_pid) {
            if ($verbose) print("process is alive: $pid\n");

            return true;
        }
    }
    return false;
}

function ps_kill($pid, $auto_remote = true)
{
    global $verbose;

    if ($verbose) print("Killing process: $pid\n");

    ps_exec("kill -9 $pid", $auto_remote);
    global $log_kill_file;
    if ($log_kill_file != false) {
        file_put_contents($log_kill_file, "Killing process: $pid\n", FILE_APPEND);
    }
}

function ps_cleanup_old_runs()
{
    global $tc_agent_name;
    $pid_file_name = "/tmp/$tc_agent_name.pidc";

    if (!file_exists($pid_file_name)) {
        return;
    }
    $content = file_get_contents($pid_file_name);
    $lines = explode("\n", $content);
    if (count($lines) != 2) {
        return;
    }
    $old_pid_from_file = $lines[0];
    $command = $lines[1];

    $output = ps_exec("ps ax | grep $old_pid_from_file 2>&1", false);
    $lines = explode("\n", $output);
    foreach ($lines as $line) {
        $row_array = explode(" ", trim($line));
        $old_pid = $row_array[0];
        if ($old_pid == $old_pid_from_file && strpos($line, $command) > 0) {
            echo "[Killing hang process: $old_pid, $command]";
            ps_kill($old_pid, false);
        }
    }
}


function wrap_to_array($val)
{
    $res = null;
    if (!isset($val) || $val == null) {
        $res = array();
    } else if (!is_array($val)) {
        $res = array($val);
    } else {
        $res = $val;
    }
    return $res;
}

function max_string_length($tokens)
{
    $res = 0;
    foreach ($tokens as $token) {
        $res = max(strlen($token), $res);
    }
    return $res;

}

function sig_handler($no)
{
    echo "[Got signal: $no]\n";
    global $ps_active_pid;
    if ($ps_active_pid) {
        posix_kill($$ps_active_pid, SIGKILL);
        echo 'Done killing child process' . $ps_active_pid . PHP_EOL;
    }
    exit;
}

function path_as_ps_ex_param($path)
{
    if (strpos($path, " ") == false) {
        return $path;
    }
    return "\\\"$path\\\"";
}

function ps_exec($command, $check_remote = true, $run_dir = null)
{
    global $use_remote, $remote_user, $remote_host, $verbose;
    $full_command = $command;
    if ($run_dir != null) {
        $full_command = "cd $run_dir; $full_command";
    }
    if ($check_remote && $use_remote) {
        $full_command = "ssh -t -t $remote_user@$remote_host \"$full_command\" 2>/dev/null";
    }
    if (is_windows()) {
        $full_command = "bash -c \"$full_command\"";
    }

    if ($verbose) print("e>$full_command\n");

    return shell_exec($full_command);
}

function ps_file_tail($file_name, &$file_pos)
{
    global $use_remote;
    $tail = null;
    if (!$use_remote) {
        $file_size = filesize($file_name);
        if ($file_size > $file_pos) {
            $fp = fopen($file_name, 'r');
            fseek($fp, $file_pos);
            $tail = fread($fp, $file_size - $file_pos);
            fclose($fp);
            $file_pos = $file_size;
        }
    } else {
        $output = ps_exec("stat -c%s \"$file_name\";echo \"\";dd if=$file_name bs=1 skip=$file_pos");
        $arr = explode("\n", $output);
        $file_pos = (int)$arr[0];
        array_shift($arr);
        $tail = implode("\n", $arr);
    }
    return $tail;
}

//pcntl_signal(SIGINT, "sig_handler");
//pcntl_signal(SIGTERM, "sig_handler");
