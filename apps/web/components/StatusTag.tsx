import { VideoStatus } from "@autoshorts/db/generated/prisma/enums";

type VideoStatusType = (typeof VideoStatus)[keyof typeof VideoStatus];

const statusConfig: Record<
  VideoStatusType,
  {
    label: string;
    textColor: string;
    bgColor: string;
  }
> = {
  PENDING: {
    label: 'Pending',
    textColor: 'text-yellow-600 ',
    bgColor: 'bg-yellow-600 ',
  },
  APPROVED: {
    label: 'Approved',
    textColor: 'text-blue-600',
    bgColor: ' bg-blue-600',
  },
  REJECTED: {
    label: 'Rejected',
    textColor: 'text-red-600',
    bgColor: ' bg-red-600',
  },
  POSTED: {
    label: 'Posted',
    textColor: ' text-green-600',
    bgColor: ' bg-green-600',
  },
};

interface StatusTagProps {
  status: VideoStatusType;
}

export function StatusTag({ status }: StatusTagProps) {
  const { label, textColor  , bgColor} = statusConfig[status];

  return (
    <span
      className={`inline-flex gap-2 font-semibold bg-zinc-800  items-center px-3 py-1 rounded-md text-xs border ${textColor}`}
    >
      <span className={`w-2 h-2 rounded-full ${bgColor}`}></span>
      {label}
    </span>
  );
}
