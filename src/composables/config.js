const circleConfig = {
  radius: 70
}
const endpointConfig = {
  name: 'source',
  radius: 10,
  fill: 'white',
  stroke: 'black',
  strokeWidth: 2
}
const lineConfig = reactive({
  stroke: 'black',
  strokeWidth: 3,
  // bezier: true,
  lineCap: 'round'
})
const componentOfShape = {
  circle: 'CircleNode'
}
const configOfShape = {
  circle: circleConfig
}
const color = {
  start: { color: '#3b82f6', className: 'bg-blue-500' },
  event: { color: '#ef4444', className: 'bg-red-500' },
  time: { color: '#22c55e', className: 'bg-green-500' },
  export: { color: '#fde047', className: 'bg-yellow-300' }
}
