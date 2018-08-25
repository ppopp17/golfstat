#!/usr/bin/sh

export CLIENT_SRC=./golfstat-client/dist
export SERVER_SRC=./golfstat-server/target
export CLIENT_DEST=/opt/jetty-distribution-9.4.10.v20180503/golfstat/webapps/golfstat-client
export SERVER_DEST=/opt/jetty-distribution-9.4.10.v20180503/golfstat/webapps

echo Empty client folder
rm -Rf $CLIENT_DEST/*

echo Remove WAR file
rm -Rf $SERVER_DEST/*.war

echo Copy client
cp -R $CLIENT_SRC/* $CLIENT_DEST

echo Copy server
cp $SERVER_SRC/*.war $SERVER_DEST

