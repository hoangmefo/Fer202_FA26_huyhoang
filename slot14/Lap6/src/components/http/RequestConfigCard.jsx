import { Card, ListGroup, Table } from 'react-bootstrap'
import axiosClient from '../../api/axiosClient'
import useAxios from '../../hooks/useAxios'
import AsyncContent from '../common/AsyncContent'

export default function RequestConfigCard() {
  const { data, loading, error, refetch } = useAxios(
    async (signal) => {
      const response = await axiosClient({
        method: 'get',
        url: '/posts',
        params: { _page: 1, _limit: 3 },
        headers: { Accept: 'application/json', 'X-Client': 'FER202' },
        timeout: 5000,
        signal,
      })
      return {
        data: {
          status: response.status,
          duration: response.duration,
          contentType: response.headers['content-type'],
          total: response.headers['x-total-count'],
          items: response.data,
        },
      }
    },
    [],
  )

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header>
        <strong>2.6 · axios(config)</strong> headers · params · timeout
      </Card.Header>
      <Card.Body>
        <AsyncContent
          loading={loading}
          error={error}
          data={data}
          onRetry={refetch}
        >
          {(info) => (
            <>
              <Table size="sm" bordered className="small">
                <tbody>
                  <tr>
                    <th>Status</th>
                    <td>{info.status}</td>
                  </tr>
                  <tr>
                    <th>Thời gian</th>
                    <td>{info.duration} ms</td>
                  </tr>
                  <tr>
                    <th>Content-Type</th>
                    <td>{info.contentType}</td>
                  </tr>
                  <tr>
                    <th>x-total-count</th>
                    <td>{info.total}</td>
                  </tr>
                </tbody>
              </Table>
              <ListGroup variant="flush">
                {info.items.map((post) => (
                  <ListGroup.Item key={post.id}>{post.title}</ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </AsyncContent>
      </Card.Body>
    </Card>
  )
}
