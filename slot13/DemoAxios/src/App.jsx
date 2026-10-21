import AxiosDemo from './componens/AxiosDemo.jsx'
import PostList from './componens/PostList.jsx'
import CreatePost from './componens/CreatePost.jsx'
import UpdatePost from './componens/UpdatePost.jsx'
import PatchPost from './componens/PatchPost.jsx'
import DeletePost from './componens/DeletePost.jsx'
import RequestConfig from './componens/RequestConfig.jsx'

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
