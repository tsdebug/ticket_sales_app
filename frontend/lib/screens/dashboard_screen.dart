import 'package:flutter/material.dart';

class DashboardScreen extends StatefulWidget {
  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  List<Map<String, dynamic>> events = [
    {
      'name': 'Tech Summit 2025',
      'sold': 50,
      'remaining': 20,
      'revenue': 10000.0,
    },
    {
      'name': 'Music Fest',
      'sold': 40,
      'remaining': 10,
      'revenue': 8000.0,
    },
    {
      'name': 'Startup Meetup',
      'sold': 30,
      'remaining': 15,
      'revenue': 6000.0,
    },
  ];

  void _logout(BuildContext context) {
    Navigator.pushReplacementNamed(context, '/');
  }

  int get totalEvents => events.length;
  int get ticketsSold => events.fold(0, (sum, e) => sum + e['sold'] as int);
  int get ticketsRemaining => events.fold(0, (sum, e) => sum + e['remaining'] as int);
  int get ticketsRefunded => 5;
  double get totalRevenue => events.fold(0.0, (sum, e) => sum + e['revenue'] as double);

  void _goToEventDetails(BuildContext context) {
    Navigator.pushNamed(context, '/eventDetails', arguments: events);
  }

  Future<void> _addEvent(BuildContext context) async {
    final result = await Navigator.pushNamed(context, '/addEvent');
    if (result != null && result is Map<String, dynamic>) {
      setState(() {
        events.add(result);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: Text('Event Dashboard'),
        backgroundColor: const Color.fromARGB(255, 169, 206, 237),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () => _logout(context),
            tooltip: 'Logout',
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            _buildDashboardHeader(),
            SizedBox(height: 20),
            Expanded(
              child: ListView(
                children: [
                  GestureDetector(
                    onTap: () => _goToEventDetails(context),
                    child: _buildStatCard('Total Events', '$totalEvents', Icons.event, Colors.indigo),
                  ),
                  _buildStatCard('Tickets Sold', '$ticketsSold', Icons.sell, Colors.green),
                  _buildStatCard('Tickets Remaining', '$ticketsRemaining', Icons.event_available, Colors.orange),
                  _buildStatCard('Tickets Refunded', '$ticketsRefunded', Icons.undo, Colors.redAccent),
                  _buildStatCard('Total Revenue', '₹$totalRevenue', Icons.attach_money, Colors.purple),
                ],
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _addEvent(context),
        label: Text("Add Event", style: TextStyle(color: const Color.fromARGB(255, 0, 0, 0)),),
        icon: Icon(Icons.add),
        backgroundColor: const Color.fromARGB(255, 134, 187, 240),
      ),
    );
  }

  Widget _buildStatCard(String title, String value, IconData icon, Color iconColor) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      elevation: 4,
      margin: EdgeInsets.symmetric(vertical: 10),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: iconColor.withOpacity(0.1),
          child: Icon(icon, color: iconColor),
        ),
        title: Text(title, style: TextStyle(fontWeight: FontWeight.w600)),
        trailing: Text(
          value,
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
        ),
      ),
    );
  }

  Widget _buildDashboardHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          'Welcome !',
          style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
        ),
        Icon(Icons.analytics, size: 28, color: Colors.blue),
      ],
    );
  }
}