#!/bin/bash
###
# Should ignore certain files
# Any file with spaces is being skpped apparently
###
touch cssRefactor.json
SAVEIFS=$IFS
IFS=$(echo -en "\n\b")
echo "" > cssRefactor.json;
echo "{" >> cssRefactor.json;
echo "\"css\":[" >> cssRefactor.json;
for i in $(find . -type f -name "*.css"); do
   if [[ $i =~ .*Web01.* || $i =~ .*Web02.* || $i =~ .*bootstrap.* || $i =~ .*Copy.* || $i =~ .*font-awesome.* || $i =~ .*.min.* ]]; then
		:
   else
   	   prefix="/Volumes/C/Projects/net2/Branches/1.0/Web/"
	   first=$i
	   second=""
	   result="${first/.\//$second}"
	   # final="\""$prefix$result"\","
	   final=$prefix$result
	   cp $final $1/css
   fi
done >> cssRefactor.json;
echo "]}" >> cssRefactor.json;
IFS=$SAVEIFS
if [ $1 ]; then
	cp cssRefactor.json $1;
fi
