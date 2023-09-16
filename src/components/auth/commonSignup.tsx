import React from 'react'
import styled from 'styled-components'
import InputInfo from '../input/inputInfo'
import { Regex } from '../../constants/Regex'
import { type FieldValues, useForm } from 'react-hook-form'
import { request } from '../../util/axios'
import useUser from '../../recoil/hooks/useUser'
import { useNavigate } from 'react-router-dom'
import theme from '../../styles/Theme'

function CommonSignup(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { logout } = useUser()
  const navigate = useNavigate()

  const onSubmit = async (data: FieldValues): Promise<void> => {
    const body = {
      email: data.email,
      password1: data.password,
      password2: data.checkpassword,
    }

    try {
      const response = await request<string>(
        'post',
        `/api/accounts/registration/`,
        body
      )

      if (response === '회원가입 성공') {
        logout()
        navigate('/common-login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <InputContainer>
        <Title>Route in</Title>
        <InputForm onSubmit={handleSubmit(onSubmit)}>
          <InputInfo
            width={300}
            labelName="이메일"
            name="email"
            specificPlaceholder="이메일을 입력해주세요"
            checkDuplicate={false}
            type="text"
            register={register}
            errors={errors.email}
            minLength={1}
            maxLength={20}
            pattern={Regex.email.pattern}
          />
          <InputInfo
            width={300}
            labelName="비밀번호"
            name="password"
            specificPlaceholder="비밀번호를 입력해주세요"
            checkDuplicate={false}
            type="password"
            register={register}
            errors={errors.password}
            minLength={10}
            maxLength={20}
            pattern={Regex.password.pattern}
          />
          <InputInfo
            width={300}
            labelName="비밀번호 확인"
            name="checkpassword"
            specificPlaceholder="비밀번호 재확인"
            checkDuplicate={false}
            type="password"
            register={register}
            errors={errors.checkpassword}
            minLength={10}
            maxLength={20}
            pattern={Regex.password.pattern}
          />
          <SaveButton>회원가입</SaveButton>
        </InputForm>
      </InputContainer>
    </Container>
  )
}

export default CommonSignup

const Container = styled.article`
  margin: 40px auto 50px 50px;
`

const InputContainer = styled.div`
  width: 400px;
  height: 500px;
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`

const Title = styled.h1`
  margin: 80px 0 40px 0;
  font-family: 'Pacifico', sans-serif;
  font-size: 50px;
  text-align: center;
`

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  margin: 0 30px 0 73px;
`

const SaveButton = styled.button`
  width: 70px;
  height: 30px;
  border-radius: 10px;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.white};

  &:hover {
    cursor: pointer;
  }
`
