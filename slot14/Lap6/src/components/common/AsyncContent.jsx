import EmptyState from './EmptyState'
import ErrorAlert from './ErrorAlert'
import LoadingSpinner from './LoadingSpinner'

const defaultIsEmpty = (data) =>
  data == null || (Array.isArray(data) && data.length === 0)

export default function AsyncContent({
  loading,
  error,
  data,
  onRetry,
  emptyText,
  isEmpty = defaultIsEmpty,
  keepPrevious = false,
  children,
}) {
  const empty = isEmpty(data)

  if (loading && (!keepPrevious || empty)) return <LoadingSpinner />
  if (error) return <ErrorAlert message={error} onRetry={onRetry} />
  if (empty) return <EmptyState text={emptyText} />

  return <div className={loading ? 'opacity-50' : ''}>{children(data)}</div>
}
