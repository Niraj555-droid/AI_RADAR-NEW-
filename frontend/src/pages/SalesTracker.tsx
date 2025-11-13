import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart,
  Clock,
  AlertCircle,
  CheckCircle,
  Calendar,
  BarChart3,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface SalesEntry {
  id: string;
  date: string;
  cashSales: number;
  onlineSales: number;
  totalSales: number;
  expenses: number;
  profit: number;
  peakHours: string[];
}

interface ExpenseEntry {
  id: string;
  date: string;
  category: string;
  item: string;
  amount: number;
  description: string;
}

const SalesTracker = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<'today' | 'history' | 'insights'>('today');
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isAddSalesOpen, setIsAddSalesOpen] = useState(false);
  
  const [salesData, setSalesData] = useState<SalesEntry[]>([
    {
      id: '1',
      date: new Date().toISOString().split('T')[0],
      cashSales: 8500,
      onlineSales: 3200,
      totalSales: 11700,
      expenses: 4500,
      profit: 7200,
      peakHours: ['12:00-14:00', '19:00-21:00']
    },
    {
      id: '2',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      cashSales: 9200,
      onlineSales: 2800,
      totalSales: 12000,
      expenses: 4800,
      profit: 7200,
      peakHours: ['12:00-14:00', '19:00-21:00']
    }
  ]);

  const [expenses, setExpenses] = useState<ExpenseEntry[]>([
    { id: '1', date: new Date().toISOString().split('T')[0], category: 'Ingredients', item: 'Paneer', amount: 1200, description: '20 kg fresh paneer' },
    { id: '2', date: new Date().toISOString().split('T')[0], category: 'Ingredients', item: 'Vegetables', amount: 800, description: 'Mixed vegetables' },
    { id: '3', date: new Date().toISOString().split('T')[0], category: 'Other', item: 'Gas Cylinder', amount: 950, description: 'LPG refill' },
    { id: '4', date: new Date().toISOString().split('T')[0], category: 'Ingredients', item: 'Spices', amount: 550, description: 'Various spices' },
  ]);

  const [formData, setFormData] = useState({
    cashSales: '',
    onlineSales: '',
    expenseCategory: 'Ingredients',
    expenseItem: '',
    expenseAmount: '',
    expenseDescription: ''
  });

  const todaySales = salesData.find(s => s.date === new Date().toISOString().split('T')[0]);
  const todayExpenses = expenses.filter(e => e.date === new Date().toISOString().split('T')[0]);
  const totalTodayExpenses = todayExpenses.reduce((sum, e) => sum + e.amount, 0);
  
  const insights = {
    avgDailySales: salesData.reduce((sum, s) => sum + s.totalSales, 0) / salesData.length,
    avgDailyProfit: salesData.reduce((sum, s) => sum + s.profit, 0) / salesData.length,
    risingCosts: expenses.filter(e => e.category === 'Ingredients').length > 0,
    peakHours: ['12:00-14:00', '19:00-21:00']
  };

  const handleAddSales = () => {
    const cash = parseFloat(formData.cashSales) || 0;
    const online = parseFloat(formData.onlineSales) || 0;
    const total = cash + online;
    const expenses = totalTodayExpenses;
    const profit = total - expenses;

    const newEntry: SalesEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      cashSales: cash,
      onlineSales: online,
      totalSales: total,
      expenses: expenses,
      profit: profit,
      peakHours: insights.peakHours
    };

    setSalesData([newEntry, ...salesData]);
    setIsAddSalesOpen(false);
    setFormData({ ...formData, cashSales: '', onlineSales: '' });
    
    toast({
      title: 'Sales recorded!',
      description: `Total sales: ₹${total.toLocaleString()}`,
    });
  };

  const handleAddExpense = () => {
    if (!formData.expenseItem || !formData.expenseAmount) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    const newExpense: ExpenseEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      category: formData.expenseCategory,
      item: formData.expenseItem,
      amount: parseFloat(formData.expenseAmount),
      description: formData.expenseDescription
    };

    setExpenses([newExpense, ...expenses]);
    setIsAddExpenseOpen(false);
    setFormData({ ...formData, expenseItem: '', expenseAmount: '', expenseDescription: '' });
    
    toast({
      title: 'Expense recorded!',
      description: `₹${newExpense.amount} added for ${newExpense.item}`,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-green-900 to-black border-b border-green-800 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="text-white">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <DollarSign className="h-8 w-8 text-green-400" />
          <div>
            <h1 className="text-2xl font-bold text-green-400">Daily Sales & Expense Tracker</h1>
            <p className="text-sm text-green-200">Track your daily finances effortlessly</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Today's Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-green-900/30 to-black border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Total Sales</p>
                <DollarSign className="h-5 w-5 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white">
                ₹{todaySales ? todaySales.totalSales.toLocaleString() : '0'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-black border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Expenses</p>
                <ShoppingCart className="h-5 w-5 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white">
                ₹{totalTodayExpenses.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-black border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Profit</p>
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white">
                ₹{todaySales ? (todaySales.totalSales - totalTodayExpenses).toLocaleString() : '0'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/30 to-black border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Peak Hours</p>
                <Clock className="h-5 w-5 text-orange-400" />
              </div>
              <p className="text-lg font-bold text-white">
                {insights.peakHours[0]}
              </p>
              <p className="text-sm text-gray-400">{insights.peakHours[1]}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'today' | 'history' | 'insights')} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900 border-green-700">
            <TabsTrigger value="today" className="data-[state=active]:bg-green-600">📊 Today</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-green-600">📅 History</TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-green-600">💡 Insights</TabsTrigger>
          </TabsList>

          {/* Today Tab */}
          <TabsContent value="today" className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Dialog open={isAddSalesOpen} onOpenChange={setIsAddSalesOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Sales
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 text-white border-green-700">
                  <DialogHeader>
                    <DialogTitle>Record Today's Sales</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-green-200">Cash Sales (₹)</label>
                      <Input
                        type="number"
                        value={formData.cashSales}
                        onChange={(e) => setFormData({ ...formData, cashSales: e.target.value })}
                        placeholder="0"
                        className="bg-gray-800 border-green-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-green-200">Online Sales (₹)</label>
                      <Input
                        type="number"
                        value={formData.onlineSales}
                        onChange={(e) => setFormData({ ...formData, onlineSales: e.target.value })}
                        placeholder="0"
                        className="bg-gray-800 border-green-700 text-white"
                      />
                    </div>
                    <Button onClick={handleAddSales} className="w-full bg-green-600 hover:bg-green-700">
                      Record Sales
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-green-600 text-green-400 hover:bg-green-900">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Expense
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 text-white border-green-700">
                  <DialogHeader>
                    <DialogTitle>Record Expense</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-green-200">Category</label>
                      <select
                        value={formData.expenseCategory}
                        onChange={(e) => setFormData({ ...formData, expenseCategory: e.target.value })}
                        className="w-full bg-gray-800 border border-green-700 text-white rounded-md px-3 py-2"
                      >
                        <option value="Ingredients">Ingredients</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Rent">Rent</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-green-200">Item Name *</label>
                      <Input
                        value={formData.expenseItem}
                        onChange={(e) => setFormData({ ...formData, expenseItem: e.target.value })}
                        placeholder="e.g., Paneer, Gas"
                        className="bg-gray-800 border-green-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-green-200">Amount (₹) *</label>
                      <Input
                        type="number"
                        value={formData.expenseAmount}
                        onChange={(e) => setFormData({ ...formData, expenseAmount: e.target.value })}
                        placeholder="0"
                        className="bg-gray-800 border-green-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-green-200">Description</label>
                      <Input
                        value={formData.expenseDescription}
                        onChange={(e) => setFormData({ ...formData, expenseDescription: e.target.value })}
                        placeholder="Additional details..."
                        className="bg-gray-800 border-green-700 text-white"
                      />
                    </div>
                    <Button onClick={handleAddExpense} className="w-full bg-green-600 hover:bg-green-700">
                      Record Expense
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Today's Expenses */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border-green-700">
              <CardHeader>
                <CardTitle className="text-white">Today's Expenses</CardTitle>
                <CardDescription className="text-gray-400">Track your daily spending</CardDescription>
              </CardHeader>
              <CardContent>
                {todayExpenses.length > 0 ? (
                  <div className="space-y-3">
                    {todayExpenses.map((expense) => (
                      <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-semibold text-white">{expense.item}</p>
                          <p className="text-sm text-gray-400">{expense.category} • {expense.description}</p>
                        </div>
                        <p className="text-lg font-bold text-red-400">₹{expense.amount.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-4">No expenses recorded today</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-green-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Sales History</CardTitle>
                    <CardDescription className="text-gray-400">View past sales and expenses</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="border-green-600 text-green-400">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {salesData.map((sale) => (
                    <Card key={sale.id} className="bg-gray-800 border-green-700">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-white">{new Date(sale.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-400">Peak: {sale.peakHours.join(', ')}</p>
                          </div>
                          <Badge className="bg-green-600">₹{sale.profit.toLocaleString()} profit</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Cash</p>
                            <p className="text-white font-semibold">₹{sale.cashSales.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Online</p>
                            <p className="text-white font-semibold">₹{sale.onlineSales.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Total</p>
                            <p className="text-green-400 font-semibold">₹{sale.totalSales.toLocaleString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-blue-900/30 to-black border-blue-700">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">Average Daily Sales</p>
                    <p className="text-2xl font-bold text-white">₹{insights.avgDailySales.toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Average Daily Profit</p>
                    <p className="text-2xl font-bold text-green-400">₹{insights.avgDailyProfit.toFixed(0)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-900/30 to-black border-orange-700">
                <CardHeader>
                  <CardTitle className="text-orange-400 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Cost Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {insights.risingCosts ? (
                    <div className="space-y-2">
                      <p className="text-sm text-orange-200">⚠️ Ingredient costs are rising</p>
                      <p className="text-xs text-gray-400">Consider bulk purchasing or finding alternative suppliers</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No cost alerts at this time</p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/30 to-black border-purple-700 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Peak Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {insights.peakHours.map((hour, index) => (
                      <Badge key={index} className="bg-purple-600 text-white px-4 py-2">
                        {hour}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-3">
                    💡 Focus on marketing and staffing during these peak hours for maximum revenue
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SalesTracker;

