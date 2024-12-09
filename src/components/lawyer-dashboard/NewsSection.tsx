import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface NewsArticle {
  id: string
  title: string
  content: string
  date: string
}

const mockNews: NewsArticle[] = [
  {
    id: "1",
    title: "New Legal Precedent Set in Corporate Law",
    content: "A recent Supreme Court decision has established...",
    date: "2024-03-18",
  },
  {
    id: "2",
    title: "Updates to Civil Procedure Rules",
    content: "The Ministry of Justice has announced changes...",
    date: "2024-03-17",
  },
  {
    id: "3",
    title: "Legal Tech Innovation Award",
    content: "Our firm has been recognized for...",
    date: "2024-03-16",
  },
]

export function NewsSection() {
  const [news, setNews] = useState(mockNews)
  const [newArticle, setNewArticle] = useState({ title: "", content: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const article: NewsArticle = {
      id: (news.length + 1).toString(),
      title: newArticle.title,
      content: newArticle.content,
      date: new Date().toISOString().split("T")[0],
    }
    setNews([article, ...news])
    setNewArticle({ title: "", content: "" })
    setIsDialogOpen(false)
    toast.success("News article posted successfully")
  }

  return (
    <Card className="col-span-full md:col-span-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Latest News</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Post News</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Post New Article</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Article Title"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Textarea
                  placeholder="Article Content"
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                  required
                />
              </div>
              <Button type="submit">Post Article</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.slice(0, 3).map((article) => (
            <div
              key={article.id}
              className="rounded-lg border p-4 hover:bg-accent transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{article.title}</h3>
                <span className="text-sm text-muted-foreground">
                  {new Date(article.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{article.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}