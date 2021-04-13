package com.highradius.internship.utils;

import java.sql.*;

public class DatabaseConnection {
	String url = AppConstants.URL;
	String dbName = AppConstants.DBNAME;
	String user = AppConstants.USER;
	String pass = AppConstants.PASS;
	Connection dbconn = null;

	public Connection initializeDatabase() {
		try {
			// Register JDBC driver
			Class.forName("com.mysql.cj.jdbc.Driver");
			// Open the connection
			this.dbconn = DriverManager.getConnection(this.url + this.dbName, this.user, this.pass);

			// display the message weather the connection is successful or not
			if (this.dbconn != null) {
				System.out.println("SQL connection successfull" + "\n");
			} else {
				System.out.println("Failed to establish SQL connection" + "\n");
			}
		}
		// catch the exception,if occurred
		catch (Exception e) {
			System.out.println("Exception encountered : " + e.getMessage() + "\n");
		}
		return dbconn;

	}
}