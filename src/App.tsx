import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Login from './pages/login'
import CommonLogin from './pages/commonLogin'
import CommonSignupPage from './pages/commonSignup'
import InitialSetting from './pages/InitialSetting'
import Main from './pages/Main'
import PostDetail from './pages/post/postDetail'
import WritePost from './pages/createPost/WritePost'
import SelectRepresentativePicture from './pages/createPost/SelectRepresentativePicture'
import Search from './pages/search/Search'
import Explore from './pages/explore/explore'
import MyProfile from './pages/profile/profile'
import Setting from './pages/setting/Setting'
import SelectPicture from './pages/createPost/SelectPicture'

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/common-login" element={<CommonLogin />} />
      <Route path="/common-signup" element={<CommonSignupPage />} />
      <Route path="/initial-setting" element={<InitialSetting />} />
      <Route path="/home" element={<Main />} />

      <Route element={<Layout />}>
        {/* 게시글 생성 */}
        <Route path="/post/:postid" element={<PostDetail />} />
        <Route path="/post/create/" element={<SelectPicture />} />
        <Route path="/post/create/text" element={<WritePost />} />
        <Route
          path="/post/create/setimage"
          element={<SelectRepresentativePicture />}
        />
        {/* 검색 */}
        <Route path="/search/*" element={<Search />} />
        <Route path="/explore/*" element={<Explore />} />
        <Route path="/profile/:username/*" element={<MyProfile />} />
        <Route path="/setting" element={<Setting />} />
      </Route>
    </Routes>
  )
}

export default App
