import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';


type AuthContextDTO = {
  user: User
  isUser: boolean,
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => Promise<void>
  loadingStorage: boolean,
  loading: boolean,
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
  const [loadingStorage, setLoadingStorage] = useState(true);
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

  async function signOut() {
    await AsyncStorage.clear()
    .then(() => {
      setUser({
        id: '',
    email: '',
    name: '',
    token: '',
      })
    })
  }
  useEffect(() => {
    async function loadAsyncUser(){

      const user = await AsyncStorage.getItem('@pizzaria');
      const userParsed: User = JSON.parse(user || '{}')
      if(Object.keys(userParsed).length > 0) {
      api.defaults.headers.common['Authorization'] =`Bearer ${userParsed.token}`

      setUser({
        id: userParsed.id,
        name: userParsed.name,
        email: userParsed.email,
        token: userParsed.token
      })
      }
      setLoadingStorage(false)
    }

    loadAsyncUser()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isUser,
      signIn,
      loadingStorage,
      signOut,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context;
}