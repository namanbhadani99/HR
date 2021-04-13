package com.highradius.internship.utils;

public final class AppConstants {
	// connections details
	public static final String URL = "jdbc:mysql://localhost:3306/";
	public static final String USER = "root";
	public static final String PASS = "root";
	public static final String DBNAME = "h2h_internship";

	// startup file location
	public static final String CSV = "C:\\Users\\KIIT\\Desktop\\1806131.csv";
	public static final int BATCHSIZE = 500;

	// DB querie
	public static final String LOADCSVQUERY = "INSERT  INTO invoice_details (business_code,cust_number,name_customer,clear_date,business_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,area_business,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id,isOpen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	public static final String LISTINVOICES = "SELECT * FROM invoice_details LIMIT 10 OFFSET ?";
	public static final String SEARCHINVOICE = "SELECT * FROM invoice_details where invoice_id in (?)";
	public static final String DELETEINVOICE = "DELETE FROM invoice_details where doc_id in (";
	public static final String UPDATEINVOICE = "UPDATE invoice_details set notes = ? , total_open_amount = ? where doc_id = ?";
	public static final String ADDINVOICE = "INSERT INTO invoice_details (doc_id, cust_number, name_customer, due_in_date, total_open_amount, invoice_id, notes) VALUES(? , ? , ? , ? , ? , ? , ? )";
}
