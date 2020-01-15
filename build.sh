#! /usr/bin/env bash

# ----- SET ENV VAR VALUES ------ #

# defaults are after :=
env_file_path="${ENV_FILE_PATH:=modules/env.js}"
api_origin="${API_ORIGIN:=http://localhost:8080}"
geoserver_origin="${GEOSERVER_ORIGIN:=http://localhost:8081}"

# for substituting the CDN minified openlayers JS/CSS for deployment

# the targets are what are currently in index.html
ol_css_target=openlayers/ol.css 
ol_js_target=openlayers/ol.js

# the replacements are the respective CDN links
ol_css_replacement=https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.5/ol.css
ol_js_replacement=https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.6.5/ol.js

# ----- END ENV VARS ----- #

# remove old build directory
rm -rf build/

# copy src to the build directory
cp -R src/ build/

# substitute env var values for the environment file
cat <<EOF > "build/$env_file_path"
export default {
  API_ORIGIN: "$api_origin",
  GEOSERVER_ORIGIN: "$geoserver_origin",
}; 
EOF

# substitute the openlayers debug CSS/JS with their CDN minified equivalents

# on macs the .tmp is required to provide a file extension for the temporary file generated during in-place replacement with sed (-e flag wont work on mac)
# by using -i.tmp this will work on mac or linux
# thanks to https://stackoverflow.com/a/22084103/7542831

# we issue two sed replacement commands separated by ';'
# we use '~' as the delimeter to not conflict with the slashes used in target/replacement

html_target=build/index.html

# execute the replacements
sed -i.tmp "s~$ol_css_target~$ol_css_replacement~g;s~$ol_js_target~$ol_js_replacement~g" "$html_target" \
&& rm "${html_target}.tmp" \
&& rm -rf build/openlayers
 
echo "build complete"
