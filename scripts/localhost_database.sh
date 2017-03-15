if [ $(ps -ef | grep mongod | grep -v grep | wc -l | tr -d ' ') != '0' ] ; then
  echo "mongod is already running";
else
  echo "mongod is not running, let'check if there is a path to mongodb_data"
  if [ -d "$VIRTUAL_ENV/data/mongodb_data" ]; then
    concurrently "mongod --dbpath $VIRTUAL_ENV/data/mongodb_data";
  else
    echo "There is no such directory $VIRTUAL_ENV/data/mongodb_data"
  fi
fi
