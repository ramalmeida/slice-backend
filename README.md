curl --request POST \
  --url http://localhost:3000/settlement/upload-json \
  --header 'Content-Type: multipart/form-data' \
  --header 'User-Agent: insomnia/9.2.0' \
  --form 'file=@/VISA_CLEARING/VISA_TRANSACTIONAL_CLEARING_20240705_02.json'


  curl --request POST \
  --url http://localhost:3000/settlement/upload-txt \
  --header 'Content-Type: multipart/form-data' \
  --header 'User-Agent: insomnia/9.2.0' \
  --form 'file=@/ep747.txt'