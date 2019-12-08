cd dist
git init
git add --all
git commit -m "release"
git remote add origin https://github.com/DaKoala/spring-ehr.git
git push -f origin master
