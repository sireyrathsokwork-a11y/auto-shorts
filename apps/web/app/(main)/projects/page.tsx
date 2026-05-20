import { getProjects } from '@/app/lib/projects/projects.server';
import PageContainer from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Project } from '@autoshorts/db/generated/prisma/client';
import { ArrowUpRight, TvMinimalPlay } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import NewProjectBtn from './NewProjectBtn';

const CardItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className='flex flex-col items-start'>
      <p className='subtitle-h3'>{label}</p>
      <p className='text-md font-semibold'>{value}</p>
    </div>
  );
};

const ProjectPage = async () => {
  const projects = await getProjects();
  const projectAmount = projects.length;

  return (
    <PageContainer
      title='Projects'
      subtitle={`${projectAmount} brand${projectAmount > 0 ? 's' : ''} - pick one to manage its pipeline`}
      action={<NewProjectBtn/>}
    >
      <main className=' flex flex-row shrink flex-wrap gap-3 w-full'>
        {projects.map((project: Project) => (
          <Link
            href={`/projects/${project.id}`}
            key={project.id}
            className=' flex flex-col w-fit gap-5 border rounded-md p-5 hover:bg-zinc-900 bg-zinc-850'
          >
            <div className=' flex justify-between'>
              <div className=' flex gap-3 items-center'>
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt='channel-image'
                  />
                ) : (
                  <TvMinimalPlay
                    className=' bg-blue-100 px-1 py-1 rounded-sm'
                    size={37}
                    color='red'
                  />
                )}

                <div>
                  <p className=' text-lg font-semibold'>
                    {project.channelName}
                  </p>
                  <p className='subtitle-h3'>{project.theme}</p>
                </div>
              </div>
              <ArrowUpRight />
            </div>
            <p className=' text-md text-zinc-400'>{project.niche}</p>

            <Separator />
            <div className=' grid grid-cols-3 justify-start xl:gap-5 gap-1 items-start'>
              <CardItem
                label='VIDEOS'
                value='54k'
              />
              <CardItem
                label='VIEWS'
                value='54'
              />
              <CardItem
                label='CADENCE'
                value='54'
              />

              <p className=' col-span-2 text-green-600 text-md'>Active</p>
              <p className=' text-xs'>Today - 12:30 PM</p>
            </div>
          </Link>
        ))}

      </main>

    </PageContainer>
  );
};

export default ProjectPage;
