export const encodeID = (id) => {
  const encodedID = encodeURIComponent(btoa(id.toString()));
  return encodedID;
};
// LARAVEL DECODE USE THE CODE
// base64_decode(urldecode($id))