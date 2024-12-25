import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Expense, expenseCategories } from "./types/expenses"
import { format } from "date-fns"

// Mock data - in a real app, this would come from an API
const mockExpenses: Expense[] = [
  {
    id: "1",
    caseId: "CASE001",
    caseTitle: "Smith vs. Johnson",
    description: "Initial filing fee",
    amount: 350,
    category: "filing_fees",
    date: "2024-03-15",
    notes: "Standard court filing fee"
  },
  {
    id: "2",
    caseId: "CASE002",
    caseTitle: "Estate Planning - Brown",
    description: "Document request fee",
    amount: 75,
    category: "evidence_fees",
    date: "2024-03-18"
  }
]

export function ExpenseManager() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses)
  const [isAddingExpense, setIsAddingExpense] = useState(false)
  const { toast } = useToast()

  const handleAddExpense = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    
    const newExpense: Expense = {
      id: Date.now().toString(),
      caseId: formData.get("caseId") as string,
      caseTitle: formData.get("caseTitle") as string,
      description: formData.get("description") as string,
      amount: Number(formData.get("amount")),
      category: formData.get("category") as Expense["category"],
      date: formData.get("date") as string,
      notes: formData.get("notes") as string
    }

    setExpenses([...expenses, newExpense])
    setIsAddingExpense(false)
    toast({
      title: "Expense Added",
      description: "The expense has been successfully added to the case.",
    })
  }

  const handleDeleteExpense = (expenseId: string) => {
    setExpenses(expenses.filter(expense => expense.id !== expenseId))
    toast({
      title: "Expense Removed",
      description: "The expense has been successfully removed.",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Case Expenses</CardTitle>
        <Dialog open={isAddingExpense} onOpenChange={setIsAddingExpense}>
          <DialogTrigger asChild>
            <Button>Add Expense</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="caseId">Case ID</Label>
                <Input id="caseId" name="caseId" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="caseTitle">Case Title</Label>
                <Input id="caseTitle" name="caseTitle" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input id="amount" name="amount" type="number" step="0.01" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" name="notes" />
              </div>
              <Button type="submit" className="w-full">Add Expense</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.caseTitle}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>
                  {expenseCategories.find(cat => cat.value === expense.category)?.label}
                </TableCell>
                <TableCell>${expense.amount.toFixed(2)}</TableCell>
                <TableCell>{format(new Date(expense.date), "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}