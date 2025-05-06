import styled from "styled-components/native";
import Title from "../components/Titulo/titulo";
import React, { useEffect, useState } from "react";
import InputTexto from "@/components/Input/input";
import Entypo from '@expo/vector-icons/Entypo';
import { Platform, Pressable, View } from "react-native";
import { api } from "@/utils/api";


export default function App()
{
    const [email, setEmail] =  useState('exemplo@exemplo.com')
    const [erroEmail, setErroEmail] = useState(false)

    const [senha, setSenha] = useState('!Pass123')
    const [erroSenha, setErroSenha] = useState(false)

    const [ConfirmarSenha, setConfirmarSenha] = useState('')
    const [ConfirmarErro, setConfirmarErro] = useState('')

    const [senhaVisivel, setSenhaVisivel] = useState(true)
    const [VerConfirmarSenha, setVerConfirmarSenha] = useState (true)

    const [formularioValido, setFormularioValido] = useState(true)


    useEffect(()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(email === 'exemplo@exemplo.com')
        {
            setFormularioValido(true)
        }
        else if(emailRegex.test(email))
        {
            setErroEmail(false)
            setFormularioValido(false)
        }
        else{
            setErroEmail(true)
            setFormularioValido(true)
        }

    },[email])


    useEffect(()=>{
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        
        if(senha == '!Pass123')
        {
            setFormularioValido(true)
        }
        else if(passwordRegex.test(senha)){
            setErroSenha(false)
            setFormularioValido(false)
        }
        else
        {
            setErroSenha(true)
            setFormularioValido(true)
        }
    }, [senha])


    useEffect(()=>{
        if(ConfirmarSenha === ''){
            setConfirmarErro('')
        }
        else if(ConfirmarSenha !== senha){
            setConfirmarErro('As senhas não coincidem')
            setFormularioValido(true)
        }
        else{
            setConfirmarErro('')
            setFormularioValido(false)
        }
    },[ConfirmarSenha, senha])


    async function Logar() {
        try{
            const teste = await api.post('/Usuarios',{
                Email: email,
                Senha: senha
            })
            console.log(teste.data)
            alert('Cadastrado com sucesso!')
            
        }
        catch(error){
            console.log(error)

        }
    }

    
    return( 
     <Tela>
        <Title 
            texto={"Criar conta"} 
            flag={true}
        />
        
        <ContainerCampoTexto>
                <View>
                <textos>Email</textos>
                    <ContainerTextInput error={erroEmail}>
                        <InputTexto 
                            placeholder="Digite seu email..."
                            onChangeText={text => setEmail(text)}
                        />
                    </ContainerTextInput>
                    {
                        erroEmail ? <TextErrorHint>Email invalido</TextErrorHint>
                            :
                        null
                    }
                </View>



                <View>
                <textos>Senha</textos>
                    <ContainerTextInput error={erroSenha}>
                            <InputTexto 
                                placeholder="Digite sua senha..."
                                onChangeText={text => setSenha(text)}
                                secureTextEntry={senhaVisivel}
                            />
                            <Pressable onPress={() => setSenhaVisivel(!senhaVisivel)}>
                                <StyledIcon name={senhaVisivel ? "eye" : "eye-with-line"} size={24} color="black" />
                            </Pressable>
                    </ContainerTextInput>
                    {
                        erroSenha ? <TextErrorHint>Senha invalida</TextErrorHint> 
                            :
                        null
                    }
                </View>


                <View>
                <textos>Confirme sua senha</textos>
                    <ContainerTextInput>
                            <InputTexto 
                                placeholder="Repita a senha..."
                                onChangeText={text => setSenha(text)}
                                secureTextEntry={senhaVisivel}
                            />
                            <Pressable onPress={() => setSenhaVisivel(!senhaVisivel)}>
                                <StyledIcon name={senhaVisivel ? "eye" : "eye-with-line"} size={24} color="black" />
                            </Pressable>
                    </ContainerTextInput>
                    {
                        erroSenha ? <TextErrorHint>Senha invalida</TextErrorHint> 
                            :
                        null
                    }
                </View>


        </ContainerCampoTexto>
        

        <ContainerBotoes>
                <Botao
                    disabled={formularioValido}
                    onPress={()=>{
                        Logar()
                    }}
                >

                    <TextoBotao>Criar minha conta</TextoBotao>
                </Botao>
            <Links>Cadastre-se</Links>
            <Links>Esqueci a senha</Links>
        </ContainerBotoes>
    </Tela>)
}

const Tela = styled.View`
    flex: 1;
    background-color: #b3b3d8;
    padding: 35px;
`

const ContainerCampoTexto = styled.View`
    gap: 30px;
    color: #4d557b;
`

const ContainerBotoes = styled.View`
    margin-top: 65px;
    gap: 20px;
`

const ContainerTextInput = styled.View<ContainerInput>`
    width: 100%;
    height: 80px;
    flex-direction: row;
    align-items: center;
    border: 3px solid ${({error} : {error: boolean}) => 
    error ? '#c6c6e2' : '#d9d9ec'};
    border-radius: 20px;
    
`

const StyledIcon = styled(Entypo)`
    margin-right: 20px;
`

const Botao = styled.Pressable`
    background-color: #abb0fc;
    padding: 20px;
    border-radius: 20px;
`

const TextoBotao = styled.Text`
    text-align: center;
    font-size: 24px;
    color: #fff;
`

const Links = styled.Text`
    text-align: center;
    color: #fff;
    font-size: 16px;
`

const textos = styled.Text`
    font-size: 20px;
    gap: 10px;
`

const TextErrorHint = styled.Text`
    font-size: 16px;
    color: #E63946;
`



    


    





   


    

       