<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getReportInfo()
    {
        $total_pending_orders = Order::where('status', 'Очікується')->sum('total_price');
        $total_sent_orders = Order::where('status', 'Відправлено')->sum('total_price');
        $total_performed_orders = Order::where('status', 'Виконано')->sum('total_price');
        $total_orders = Order::count();
        $total_products = Product::count();
        $total_users = User::where('user_type', 'user')->count();
        $total_admins = User::where('user_type', 'admin')->count();
        $total_messages = Contact::count();

        return response()->json(['total_pending_orders' => $total_pending_orders, 'total_sent_orders' => $total_sent_orders, 'total_performed_orders' => $total_performed_orders, 'total_orders' => $total_orders, 'total_products' => $total_products, 'total_users' => $total_users, 'total_admins' => $total_admins, 'total_messages' => $total_messages]);
    }
}
