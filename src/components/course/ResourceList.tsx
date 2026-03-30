import { FileText, BookOpen, Code2, CheckSquare, ExternalLink } from 'lucide-react'
import type { Resource } from '@/types'

const RESOURCE_ICONS = {
  pdf: { Icon: FileText, label: 'PDF', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  notebook: {
    Icon: BookOpen,
    label: 'Notebook',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  code: { Icon: Code2, label: 'Código', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  checklist: {
    Icon: CheckSquare,
    label: 'Checklist',
    color: 'text-[#60A5FA] bg-[#2563EB]/10 border-[#2563EB]/25',
  },
}

interface ResourceListProps {
  resources: Resource[]
}

export default function ResourceList({ resources }: ResourceListProps) {
  if (!resources || resources.length === 0) return null

  return (
    <div className="mt-8">
      <h3 className="font-syne font-semibold text-[#E2E8F0] text-lg mb-5">
        Recursos de esta lección
      </h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {resources.map((resource) => {
          const config = RESOURCE_ICONS[resource.type]
          const { Icon } = config
          return (
            <div
              key={resource.id}
              className="flex items-center gap-3 bg-[#0A1628] border border-[#2563EB]/15 rounded-xl p-4 hover:border-[#2563EB]/35 transition-all duration-200 group"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center border flex-shrink-0 ${config.color}`}
              >
                <Icon size={17} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#E2E8F0] text-base font-medium truncate">{resource.title}</p>
                <p className="text-[#94A3B8] text-sm">{config.label}</p>
              </div>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/25 flex items-center justify-center text-[#60A5FA] opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                onClick={(e) => e.preventDefault()}
                aria-label={`Descargar ${resource.title}`}
              >
                <ExternalLink size={12} />
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
