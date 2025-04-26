#!/bin/bash

ENV=$(cat base/.env)

for e in $ENV; do
	if [[ $e =~ DATABASE=.* ]]; then
		DATABASE=${e#*=}
		echo "Found database: $DATABASE"
 	elif [[ $e =~ DATABASE_USER=.* ]]; then
		USER=${e#*=}
		echo "Found user: $USER"
	elif [[ $e =~ DATABASE_PASSWORD=.* ]]; then
		PASSWORD=${e#*=}
		echo "Found password: $PASSWORD"
	fi
done

PASSWORD=${PASSWORD%\"}
PASSWORD=${PASSWORD#\"}

echo $PASSWORD

if [[ $DATABASE != "" ]]; then
	BACKUP_FILE=$DATABASE-backup.sql
	TARGZ_FILE=backup-$(date +"%Y-%m-%d--%H-%M").tar.gz

	MYSQLDUMP="mysqldump --skip-add-drop-table --no-create-info -u $USER --password=$PASSWORD $DATABASE"
	TARGZ="tar -czf $TARGZ_FILE $BACKUP_FILE base/sounds/*"

	echo "Backup to $BACKUP_FILE"
	echo $MYSQLDUMP
	$MYSQLDUMP > $BACKUP_FILE

	echo "Tar archive to $TARGZ_FILE"
	$TARGZ
else
	echo "No database found in \"base/.env\""
fi
