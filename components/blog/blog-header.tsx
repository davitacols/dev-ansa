interface BlogHeaderProps {
    title: string
    description?: string
  }
  
  export function BlogHeader({ title, description }: BlogHeaderProps) {
    return (
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-xl text-muted-foreground mt-2">{description}</p>}
      </div>
    )
  }
  