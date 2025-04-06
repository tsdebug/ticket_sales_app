import 'package:flutter/material.dart';
import 'screens/login_screen.dart';
import 'screens/dashboard_screen.dart';
import 'screens/add_event_screen.dart';
import 'screens/event_details_screen.dart';

void main() {
  runApp(TicketSalesApp());
}


class TicketSalesApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ticket Sales App',
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      routes: {
        '/': (context) => LoginScreen(),
        '/dashboard': (context) => DashboardScreen(),
        '/addEvent': (context) => AddEventScreen(),
        '/eventDetails': (context) => EventDetailsScreen(),
      },
    );
  }
}