import { getProjectDetails } from '@/app/lib/projects/projects.server';
import PageContainer from '@/components/PageContainer';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowRight, TvMinimalPlay } from 'lucide-react';
import Image from 'next/image';
import NextVideo from './NextVideo';
import { Video } from '@autoshorts/db/generated/prisma/client';
import { StatusTag } from '@/components/StatusTag';

export const dynamic = 'force-dynamic';

const Card = ({
  label,
  value,
  subDetail,
}: {
  label: string;
  value: number |  string;
  subDetail: string;
}) => {
  return (
    <div className=' flex flex-col gap-4 border p-6 w-75 rounded-lg text-start'>
      <p className=' text-md text-zinc-400  font-semibold'>{label.toUpperCase()}</p>
      <p className=' text-2xl font-bold'>{value}</p>
      <p className=' text-md font-semibold text-zinc-400'>{subDetail}</p>
    </div>
  );
};

const ProjectDetail = async ({ params }: { params: { projectId: string } }) => {
  const { projectId } = await params;

  const project = await getProjectDetails(projectId);

  console.log('projct', project);
  return (
    <PageContainer>
      {project && (
        <>
          <section className=' flex flex-col w-fit rounded-md hover:bg-zinc-900 bg-zinc-850'>
            <div className=' flex gap-5 items-center'>
              {project && project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt='channel-image'
                />
              ) : (
                <TvMinimalPlay
                  className=' bg-blue-100 px-1 py-1 rounded-sm'
                  size={50}
                  color='red'
                />
              )}

              <div>
                <p className=' text-2xl font-semibold'>
                  {project.channelName.toUpperCase()}
                </p>
                <p className='subtitle-h2 mt-1'>{project.theme}</p>
              </div>
            </div>
          </section>

          <Separator />

          <section className=' flex gap-3'>
            <Card
              label='Videos'
              value={project?.videos.length}
              subDetail='Lifetime'
            />

            <Card
              label='Total Views'
              value={'1.2M'}
              subDetail='+12% this week'
            />

            <Card
              label='Last Post'
              value={'Today'}
              subDetail='12:30 PM'
            />
          </section>

          <section>
            <NextVideo />
          </section>

          <section className=' border rounded-lg p-6 flex flex-col gap-5'>
            <div className=' flex justify-between items-center'>
              <div>
                <p className=' text-lg font-semibold'>Video on this channel</p>
                <p className=' text-sm text-zinc-400'>
                  {project?.videos.length} total
                </p>
              </div>

              <div className=' flex gap-1 items-center'>
                <p className=' text-sm text-zinc-400'>VIEW ALL</p>
                <ArrowRight
                  color='gray'
                  size={15}
                />
              </div>
            </div>
            <div className='  flex flex-wrap gap-5'>
              {project?.videos &&
                project.videos.map((video: Video) => (
                  <div
                    key={video.id}
                    className='  bg-zinc-900 rounded-b-lg shadow-sm shadow-zinc-600'
                  >
                    <div className=' relative'>
                      <div className='absolute top-2 right-2'>
                        <StatusTag status={video.status} />
                      </div>
                      <video
                        controls
                        style={{ width: '280px', height: '400px' }}
                      >
                        <source
                          src='https://example.com/video.mp4'
                          type='video/mp4'
                        />
                      </video>

                      <div className=' p-3'>
                        <p> {video.title}</p>
                        <p className=' text-xs text-zinc-400 mt-2'>
                          Created At : {video.createdAt.toLocaleDateString()}
                        </p>
                      </div>

                    </div>
                  </div>
                ))}
            </div>
          </section>
        </>
      )}
    </PageContainer>
  );
};

export default ProjectDetail;
