#!/bin/bash  
cd "$( dirname "$0" )"  
java -Xms512M -Xmx1G -XX:+UseConcMarkSweepGC -jar spigot-1.11.2.jar
