import 'package:flutter/material.dart';

class EventDetailsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> events =
        ModalRoute.of(context)!.settings.arguments as List<Map<String, dynamic>>;

    return Scaffold(
      appBar: AppBar(title: Text('Event Details')),
      backgroundColor: Colors.lightBlue[50], // Change background color here
      body: ListView.builder(
        itemCount: events.length,
        itemBuilder: (context, index) {
          final event = events[index];
          return Card(
            margin: EdgeInsets.all(10),
            child: ListTile(
              title: Text(event['name']),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Tickets Sold: ${event['sold']}'),
                  Text('Tickets Remaining: ${event['remaining']}'),
                  Text('Revenue: ₹${event['revenue']}'),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
