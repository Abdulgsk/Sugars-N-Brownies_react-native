
import { Redirect } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';

export default function TabIndex () {
  const {session,isAdmin} = useAuth();
 
  if(session){
  return <Redirect href={'/(user)/menu/'} />;
  }

};