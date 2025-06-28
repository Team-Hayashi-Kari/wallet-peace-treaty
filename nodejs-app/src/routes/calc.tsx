import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/calc')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/main"!</div>
}