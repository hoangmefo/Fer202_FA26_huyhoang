import AxiosDemo from './components/AxiosDemo.jsx'
import PostList from './components/PostList.jsx'
import CreatePost from './components/CreatePost.jsx'
import UpdatePost from './components/UpdatePost.jsx'
import PatchPost from './components/PatchPost.jsx'
import DeletePost from './components/DeletePost.jsx'
import RequestConfig from './components/RequestConfig.jsx'

function App() {
  return (
    <>
      <AxiosDemo />
      <hr />
      <PostList />
      <hr />
      <CreatePost />
      <hr />
      <UpdatePost />
      <hr />
      <PatchPost />
      <hr />
      <DeletePost />
      <hr />
      <RequestConfig />
    </>
  )
}

export default App
