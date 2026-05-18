import PageContainer from "@/components/PageContainer"
import { ArrowLeft } from "lucide-react"

const ProjectDetail = () => {
  return (
    <PageContainer>
      <section>
        <div className=" flex gap-2">
          <ArrowLeft color="gray" size={18}/>
          <p className="subtitle-h3">All projects</p>
        </div>
      </section>
    </PageContainer>
  )
}

export default ProjectDetail