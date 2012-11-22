#!/usr/bin/env ruby

require 'fileutils'

DONT_REMOVE = ["/LICENSE", "/index.html"]
DONT_COPY = ["/spec_coverage.html", "/test.html"]

SRC_DIR = File.expand_path(File.join(File.dirname(__FILE__), "..", "test"))
DST_DIR = File.expand_path(File.join(ARGV[0], *"ShadowDOM/tests/submissions/Google".split("/")))

def list_files(dir)
  Dir.glob(File.join(dir, "**/*"))
end

def copy_files(src, dst)
  src_files = list_files(src)
  src_files.each do |s|
    relative = s.sub(SRC_DIR, "")
    d = File.join(dst, relative)
    copy_file(s, d) if File.file?(s) and not DONT_COPY.include?(s.sub(src, ""))
  end

  copy_file(File.join(src, "/spec_coverage.html"), File.join(dst, "/index.html"))
end

def copy_file(src, dst)
  exists = File.exist?(dst)
  ddir = File.dirname(dst)
  FileUtils.mkdir_p(ddir) unless File.exist?(ddir)
  FileUtils.cp(src, dst)
  p "#{src} #{dst}"
end

def remove_missings(src, dst)
  dont_remove = list_files(src).map { |i| i.sub(src, "") } + DONT_REMOVE
  list_files(dst).each do |d|
    d_relative = d.sub(dst, "")
    unless dont_remove.include?(d_relative)
      File.delete(d)
    end
  end
end

copy_files(SRC_DIR, DST_DIR)
remove_missings(SRC_DIR, DST_DIR)
