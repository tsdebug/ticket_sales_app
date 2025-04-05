import 'package:flutter/material.dart';

class AddEventScreen extends StatefulWidget {
  @override
  _AddEventScreenState createState() => _AddEventScreenState();
}

class _AddEventScreenState extends State<AddEventScreen> {
  final _formKey = GlobalKey<FormState>();

  String eventName = '';
  String location = '';
  String ticketType = '';
  String price = '';
  String ticketCount = '';
  DateTime? selectedDate;

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate ?? DateTime.now(),
      firstDate: DateTime(2020),
      lastDate: DateTime(2100),
    );
    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
      });
    }
  }

  void _submitForm() {
    if (_formKey.currentState!.validate()) {
      // Normally, send data to backend here. For now, print to console.
      print('Event Created: $eventName, $selectedDate, $location, $ticketType, $price, $ticketCount');
      Navigator.pop(context); // Go back to dashboard
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Add New Event')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(
                decoration: InputDecoration(labelText: 'Event Name'),
                validator: (value) => value!.isEmpty ? 'Enter event name' : null,
                onChanged: (val) => setState(() => eventName = val),
              ),
              SizedBox(height: 10),
              TextFormField(
                decoration: InputDecoration(labelText: 'Location'),
                validator: (value) => value!.isEmpty ? 'Enter location' : null,
                onChanged: (val) => setState(() => location = val),
              ),
              SizedBox(height: 10),
              TextFormField(
                decoration: InputDecoration(labelText: 'Ticket Type'),
                validator: (value) => value!.isEmpty ? 'Enter ticket type' : null,
                onChanged: (val) => setState(() => ticketType = val),
              ),
              SizedBox(height: 10),
              TextFormField(
                decoration: InputDecoration(labelText: 'Price'),
                keyboardType: TextInputType.number,
                validator: (value) => value!.isEmpty ? 'Enter price' : null,
                onChanged: (val) => setState(() => price = val),
              ),
              SizedBox(height: 10),
              TextFormField(
                decoration: InputDecoration(labelText: 'Number of Tickets'),
                keyboardType: TextInputType.number,
                validator: (value) => value!.isEmpty ? 'Enter ticket count' : null,
                onChanged: (val) => setState(() => ticketCount = val),
              ),
              SizedBox(height: 10),
              ListTile(
                title: Text(selectedDate == null
                    ? 'Choose Event Date'
                    : 'Date: ${selectedDate!.toLocal()}'.split(' ')[0]),
                trailing: Icon(Icons.calendar_today),
                onTap: () => _selectDate(context),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _submitForm,
                child: Text('Create Event'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}                    