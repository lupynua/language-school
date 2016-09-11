cmd="puma -b tcp://10.132.0.3:3000 -e test &"
cmd1="gem env"
exec ( cmd )
exec ( cmd1 )