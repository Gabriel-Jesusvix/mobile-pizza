import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { api } from '../services/api';


type AuthContextDTO = {
  user: User
  isUser: boolean,
  signIn: (credentials: SignInProps) => Promise<void>
}

type User = {
  id: string;
  name: string;
  email: string;
  token: string;
}
interface AuthProviderProps {
  children: ReactNode;
}

type SignInProps = {
  email: string;
  password: string;
}
export const AuthContext = createContext({} as AuthContextDTO)


export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({
    id: '',
    email: '',
    name: '',
    token: '',
  } );
  const [loading, setLoading] = useState(false);

  const isUser = !!user.name;

  
  async function signIn({ email, password}: SignInProps ) {
    setLoading(true)
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      })
      const { id, name,token } = response.data;


      const data = {
        ...response.data,
      }
      await AsyncStorage.setItem('@pizzaria', JSON.stringify(data))
      api.defaults.headers.common['Authorization'] =`Bearer ${token}`

      setUser({
        id, 
        name,
        email,
        token
      })
      setLoading(false)

    } catch (error) {
      console.log('Erro ao acessar',error)
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isUser,
      signIn  
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context;
}