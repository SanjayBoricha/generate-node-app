import { Edge } from "edge.js"
import { join } from "path"

class View {
  private static instance: View

  constructor() {
    if (View.instance) {
      return View.instance
    }

    const edge = new Edge({ cache: false })
    this.edge = edge
    this.edge.mount(join(__dirname, '../resources/views'))

    View.instance = this
  }

  private edge: Edge | undefined

  public make(template: string, state?: any) {
    return this.edge?.render(template, state)
  }
}

export async function view(template: string, state?: any): Promise<string> {
  return (await new View().make(template, state)) || ''
}

export default View
