#!/bin/bash

yarn discord > discord.log 2> discord.log &

echo $! > .pid
