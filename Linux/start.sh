#!/bin/sh  
BINDIR=$(dirname "$(readlink -fn "$0")")  
cd "$BINDIR"  
java -Xms512M -Xmx1G -XX:+UseConcMarkSweepGC -jar glowstone.jar
