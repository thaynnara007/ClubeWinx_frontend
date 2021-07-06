import Avatar from '@material-ui/core/Avatar';

function ImageProfile(children, src, className) {
  return (
    <>
      <Avatar src={src} className={className}>
        {children}
      </Avatar>
    </>
  );
}
export default ImageProfile;
