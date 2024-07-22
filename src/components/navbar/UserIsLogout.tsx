import Button2 from '../ui/btn/Button2'
import Button1 from '../ui/btn/Button1'
export default function UserIsLogout() {
  return (
    <div className=' h-full flex flex-row items-center'>
      <Button2
        title='Login'
      />
      <Button1
        title={"Create Account"}
      />
    </div>
  );
}
