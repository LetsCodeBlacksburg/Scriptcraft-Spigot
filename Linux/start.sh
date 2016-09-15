#!/bin/sh  
BINDIR=$(dirname "$(readlink -fn "$0")")  
cd "$BINDIR"  
java -Xms512M -Xmx1G -XX:+UseConcMarkSweepGC -jar spigot-1.10.2-R0.1-SNAPSHOT-latest.jar
