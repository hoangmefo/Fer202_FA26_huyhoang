import { Col, Row } from 'react-bootstrap'
import CreatePostCard from '../components/http/CreatePostCard'
import DeletePostCard from '../components/http/DeletePostCard'
import PatchPostCard from '../components/http/PatchPostCard'
import PostListCard from '../components/http/PostListCard'
import RequestConfigCard from '../components/http/RequestConfigCard'
import UpdatePostCard from '../components/http/UpdatePostCard'

export default function HttpRequestsPage() {
  return (
    <>
      <h2 className="mb-3">HTTP Requests với Axios</h2>
      <Row xs={1} lg={2} className="g-4">
        <Col>
          <PostListCard />
        </Col>
        <Col>
          <CreatePostCard />
        </Col>
        <Col>
          <UpdatePostCard />
        </Col>
        <Col>
          <PatchPostCard />
        </Col>
        <Col>
          <DeletePostCard />
        </Col>
        <Col>
          <RequestConfigCard />
        </Col>
      </Row>
    </>
  )
}
