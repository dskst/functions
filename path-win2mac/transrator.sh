#!/bin/sh
echo -E $1 | perl -anE 'chomp; s{\\+}{/}g; print "smb:/$_"' | xargs -n 1 open
