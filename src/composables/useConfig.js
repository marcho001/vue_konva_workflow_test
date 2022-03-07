export default () => {
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
  const lineConfig = {
    stroke: 'black',
    strokeWidth: 3,
    // bezier: true,
    lineCap: 'round',
    fill: 'black'
  }
  const regularPolygonConfig = {
    x: 100,
    y: 150,
    sides: 8,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4
    // rotation: 45
  }
  const componentOfShape = {
    circle: 'CircleNode',
    regularPolygon: 'RegularPolygon'
  }
  const configOfShape = {
    circle: circleConfig,
    regularPolygon: regularPolygonConfig
  }
  const deleteBtnConfig = {
    name: 'source',
    radius: 10,
    fill: 'purple',
    cursor: 'pointer'
  }
  const color = {
    start: { color: '#3b82f6', className: 'bg-blue-500' },
    event: { color: '#ef4444', className: 'bg-red-500' },
    time: { color: '#22c55e', className: 'bg-green-500' },
    export: { color: '#fde047', className: 'bg-yellow-300' }
  }
  return { color, configOfShape, endpointConfig, componentOfShape, lineConfig, deleteBtnConfig }
}
