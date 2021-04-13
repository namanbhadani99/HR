package com.highradius.internship.dao;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.highradius.internship.model.Invoice;
import com.highradius.internship.utils.AppConstants;
import com.highradius.internship.utils.DatabaseConnection;

public class InvoiceDAO {

	// constructor
	public InvoiceDAO() {
	}

	private Connection jdbcConnection;
	private PreparedStatement statement;
	private ResultSet rs;

	// loadCSVonStartup
	// function to load data on server startup
	public void loadCSVonStartup() {

		String sql = AppConstants.LOADCSVQUERY;
		String csvFilePath = AppConstants.CSV;
		int batchSize = AppConstants.BATCHSIZE;
		// date formats
		DateFormat dateFormatHMS = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

		try {
			DatabaseConnection dbconn = new DatabaseConnection();
			jdbcConnection = dbconn.initializeDatabase();
			jdbcConnection.setAutoCommit(false);
			// creating prepared statement
			statement = jdbcConnection.prepareStatement(sql);

			BufferedReader lineReader = new BufferedReader(new FileReader(csvFilePath));
			String lineText = null;
			int count = 0;
			lineReader.readLine(); // skip header line
			while ((lineText = lineReader.readLine()) != null) {
				String[] data = lineText.split(",");
				String businessCode = data[0];
				String custNumber = data[1];
				String nameCustomer = data[2];
				String clearDate = data[3];
				String businessYear = data[4];
				String docId = data[5];
				String postingDate = data[6];
				String documentCreateDate = data[7];
				String dueInDate = data[9];
				String invoiceCurrency = data[10];
				String documentType = data[11];
				String postingId = data[12];
				String areaBusiness = data[13];
				String totalOpenAmount = data[14];
				String baselineCreateDate = data[15];
				String custPaymentTerms = data[16];
				String invoiceId = data[17];
				String isOpen = data[18];

				statement.setString(1, businessCode);
				statement.setString(2, custNumber);
				statement.setString(3, nameCustomer);

				if (nullableCheck(clearDate) != null) {
					// Date dClear_date = dateFormatHMS.parse(clear_date);
					Timestamp clearDateTs = new Timestamp(dateFormatHMS.parse(clearDate).getTime());
					statement.setTimestamp(4, clearDateTs);
				} else {
					statement.setTimestamp(4, null);
				}

				statement.setDouble(5, Double.parseDouble(numberNullCheck(businessYear).toString()));

				// Double lDoc_id = Double.parseDouble(doc_id);
				// System.out.println("doc id: "+lDoc_id);
				statement.setDouble(6, Double.parseDouble(docId));

				if (nullableCheck(postingDate) != null) {
					Date dPostingDate = new Date(dateFormat.parse(postingDate).getTime());
					statement.setDate(7, dPostingDate);
				} else {
					statement.setDate(7, null);
				}

				if (nullableCheck(documentCreateDate) != null) {
					LocalDate dDocumentCreateDate = LocalDate.parse(
							Integer.valueOf(documentCreateDate.split("\\.")[0]).toString(),
							DateTimeFormatter.BASIC_ISO_DATE);
					statement.setDate(8, java.sql.Date.valueOf(dDocumentCreateDate));
				} else {
					statement.setDate(8, null);
				}

				if (nullableCheck(dueInDate) != null) {
					LocalDate dDueInDate = LocalDate.parse(Integer.valueOf(dueInDate.split("\\.")[0]).toString(),
							DateTimeFormatter.BASIC_ISO_DATE);
					statement.setDate(9, java.sql.Date.valueOf(dDueInDate));
				} else {
					statement.setDate(9, null);
				}

				statement.setString(10, invoiceCurrency);
				statement.setString(11, documentType);

				Double dPostingId = Double.parseDouble(numberNullCheck(postingId).toString());
				statement.setDouble(12, dPostingId);

				statement.setString(13, areaBusiness);

				Double dTotalOpen = Double.parseDouble(numberNullCheck(totalOpenAmount).toString());
				statement.setDouble(14, dTotalOpen);

				if (nullableCheck(baselineCreateDate) != null) {
					LocalDate dBaselineCreateDate = LocalDate.parse(
							Integer.valueOf(baselineCreateDate.split("\\.")[0]).toString(),
							DateTimeFormatter.BASIC_ISO_DATE);
					statement.setDate(15, java.sql.Date.valueOf(dBaselineCreateDate));
				} else {
					statement.setDate(15, null);
				}

				statement.setString(16, custPaymentTerms);

				Double dInvoiceId = Double.parseDouble(numberNullCheck(invoiceId).toString());
				statement.setDouble(17, dInvoiceId);

				Double dIsOpen = Double.parseDouble(numberNullCheck(isOpen).toString());
				statement.setDouble(18, dIsOpen);

				statement.addBatch();
				count++;
				if (count % batchSize == 0) {
					System.out.println("batch size: " + count);
					statement.executeBatch();
				}

			}

			lineReader.close();

			// execute the remaining queries
			statement.executeBatch();

			jdbcConnection.commit();

			System.out.println("execution completed" + "\n");

		} catch (IOException ex) {
			System.out.println("IO Exception Encountered" + "\n");
			System.err.println(ex);
		} catch (SQLException ex) {
			printSQLException(ex);

			try {
				System.out.println("Trying to Rollback" + "\n");
				jdbcConnection.rollback();
			} catch (SQLException e) {
				printSQLException(ex);
			}
		} catch (Exception ex) {
			System.out.println("Generic Exception Encountered" + "\n");
			ex.printStackTrace();
		} finally {
			try {
				disconnect();
			} catch (SQLException e) {
				printSQLException(e);
			}

		}

	}

	// function to list 10 invoices
	public List<Invoice> listInvoices(String pageCount) throws SQLException {
		String sql = AppConstants.LISTINVOICES;
		List<Invoice> invoiceList = new ArrayList<Invoice>();
		try {
			jdbcConnection = new DatabaseConnection().initializeDatabase();
			statement = jdbcConnection.prepareStatement(sql);
			statement.setInt(1, Integer.parseInt(pageCount));
			rs = statement.executeQuery();

			while (rs.next()) {
				Invoice invoice = setModel(rs);
				invoiceList.add(invoice);
			}
		} catch (SQLException ex) {
			printSQLException(ex);

			try {
				System.out.println("Trying to Rollback" + "\n");
				jdbcConnection.rollback();
			} catch (SQLException e) {
				printSQLException(ex);
			}
		} catch (Exception ex) {
			System.out.println("Generic Exception Encountered" + "\n");
			ex.printStackTrace();
		} finally {
			try {
				disconnect();
			} catch (SQLException e) {
				printSQLException(e);
			}

		}

		return invoiceList;
	}

	public List<Invoice> searchInvoice(String invoiceId) throws SQLException {
		String sql = AppConstants.SEARCHINVOICE;
		List<Invoice> invoiceList = new ArrayList<Invoice>();

		try {
			jdbcConnection = new DatabaseConnection().initializeDatabase();
			statement = jdbcConnection.prepareStatement(sql);
			statement.setString(1, invoiceId);
			rs = statement.executeQuery();

			while (rs.next()) {
				Invoice invoice = setModel(rs);
				invoiceList.add(invoice);
			}
		} catch (SQLException ex) {
			printSQLException(ex);

			try {
				System.out.println("Trying to Rollback" + "\n");
				jdbcConnection.rollback();
			} catch (SQLException e) {
				printSQLException(ex);
			}
		} catch (Exception ex) {
			System.out.println("Generic Exception Encountered" + "\n");
			ex.printStackTrace();
		} finally {
			try {
				disconnect();
			} catch (SQLException e) {
				printSQLException(e);
			}

		}

		return invoiceList;
	}

	// for dynamic query creation based on the number of inputs
	private static String createQuery(int length) {
		String query = AppConstants.DELETEINVOICE;
		StringBuilder queryBuilder = new StringBuilder(query);
		for (int i = 0; i < length; i++) {
			queryBuilder.append(" ?");
			if (i != length - 1)
				queryBuilder.append(",");
		}
		queryBuilder.append(")");
		return queryBuilder.toString();
	}

	public boolean deleteInvoice(String[] docList) throws SQLException {
		boolean isSuccess = false;

		try {
			jdbcConnection = new DatabaseConnection().initializeDatabase();
			jdbcConnection.setAutoCommit(false);
			String query = createQuery(docList.length);
			PreparedStatement statement = jdbcConnection.prepareStatement(query);

			System.out.println("Query=" + query);

			for (int i = 1; i <= docList.length; i++) {
				statement.setString(i, docList[i - 1]);
			}

			isSuccess = statement.executeUpdate() > 0;
			jdbcConnection.commit();

		} catch (SQLException ex) {
			printSQLException(ex);

			try {
				System.out.println("Trying to Rollback" + "\n");
				jdbcConnection.rollback();
			} catch (SQLException e) {
				printSQLException(ex);
			}
		} catch (Exception ex) {
			System.out.println("Generic Exception Encountered" + "\n");
			ex.printStackTrace();
		} finally {
			try {
				disconnect();
			} catch (SQLException e) {
				printSQLException(e);
			}

		}

		return isSuccess;
	}

	public boolean updateInvoice(String docId, String totalOpenAmount, String notes) throws SQLException {
		boolean isSuccess = false;

		try {
			jdbcConnection = new DatabaseConnection().initializeDatabase();
			jdbcConnection.setAutoCommit(false);
			String query = AppConstants.UPDATEINVOICE;
			statement = jdbcConnection.prepareStatement(query);

			System.out.println("Query=" + query);

			statement.setString(1, notes);
			statement.setString(2, totalOpenAmount);
			statement.setString(3, docId);

			isSuccess = statement.executeUpdate() > 0;
			jdbcConnection.commit();

		} catch (SQLException ex) {
			printSQLException(ex);

			try {
				System.out.println("Trying to Rollback" + "\n");
				jdbcConnection.rollback();
			} catch (SQLException e) {
				printSQLException(ex);
			}
		} catch (Exception ex) {
			System.out.println("Generic Exception Encountered" + "\n");
			ex.printStackTrace();
		} finally {
			try {
				disconnect();
			} catch (SQLException e) {
				printSQLException(e);
			}

		}

		return isSuccess;
	}

	public boolean addInvoice(Invoice inv) throws SQLException {
		boolean isSuccess = false;

		try {
			jdbcConnection = new DatabaseConnection().initializeDatabase();
			jdbcConnection.setAutoCommit(false);
			String query = AppConstants.ADDINVOICE;
			statement = jdbcConnection.prepareStatement(query);

			System.out.println("Query=" + query);

			statement.setDouble(1, inv.getDocId());
			statement.setString(2, inv.getCustNumber());
			statement.setString(3, inv.getNameCustomer());
			statement.setDate(4, inv.getDueInDate());
			statement.setDouble(5, inv.getTotalOpenAmount());
			statement.setDouble(6, inv.getInvoiceId());
			statement.setString(7, inv.getNotes());

			isSuccess = statement.executeUpdate() > 0;
			jdbcConnection.commit();

		} catch (SQLException ex) {
			printSQLException(ex);

			try {
				System.out.println("Trying to Rollback" + "\n");
				jdbcConnection.rollback();
			} catch (SQLException e) {
				printSQLException(ex);
			}
		} catch (Exception ex) {
			System.out.println("Generic Exception Encountered" + "\n");
			ex.printStackTrace();
		} finally {
			try {
				disconnect();
			} catch (SQLException e) {
				printSQLException(e);
			}

		}

		return isSuccess;
	}

	// utils - start
	// for loading CSV
	private Double numberNullCheck(String ob) {
		if (ob == null || ob.trim().isEmpty()) {
			return new Double(0);
		} else {
			return Double.parseDouble(ob);
		}
	}

	private Object nullableCheck(String ob) {
		if (ob == null || ob.trim().isEmpty()) {
			return null;
		} else {
			return ob;
		}
	}

	// for setting model

	private Invoice setModel(ResultSet rs) {
		Invoice inv = new Invoice();

		try {
			inv.setBusinessCode(rs.getString("business_code"));
			inv.setCustNumber(rs.getString("cust_number"));
			inv.setNameCustomer(rs.getString("name_customer"));
			inv.setClearDate(rs.getTimestamp("clear_date"));
			inv.setBusinessYear(rs.getDouble("business_year"));
			inv.setDocId(rs.getDouble("doc_id"));
			inv.setPostingDate(rs.getDate("posting_date"));
			inv.setDocumentCreateDate(rs.getDate("document_create_date"));
			inv.setDueInDate(rs.getDate("due_in_date"));
			inv.setInvoiceCurrency(rs.getString("invoice_currency"));
			inv.setDocumentType(rs.getString("document_type"));
			inv.setPostingId(rs.getDouble("posting_id"));
			inv.setAreaBusiness(rs.getString("area_business"));
			inv.setTotalOpenAmount(rs.getDouble("total_open_amount"));
			inv.setBaselineCreateDate(rs.getDate("baseline_create_date"));
			inv.setCustPaymentTerms(rs.getString("cust_payment_terms"));
			inv.setInvoiceId(rs.getDouble("invoice_id"));
			inv.setIsOpen(rs.getDouble("isOpen"));
			inv.setNotes(rs.getString("notes"));
		} catch (SQLException ex) {
			printSQLException(ex);
		} catch (Exception ex) {
			System.out.println("Generic Exception Encountered" + "\n");
			ex.printStackTrace();
		}
		return inv;
	}

	// printing formatted SQL exception
	private void printSQLException(SQLException ex) {
		for (Throwable e : ex) {
			if (e instanceof SQLException) {
				e.printStackTrace(System.err);
				System.err.println("SQLState: " + ((SQLException) e).getSQLState() + "\n");
				System.err.println("Error Code: " + ((SQLException) e).getErrorCode() + "\n");
				System.err.println("Message: " + e.getMessage() + "\n");
				Throwable t = ex.getCause();
				while (t != null) {
					System.out.println("Cause: " + t + "\n");
					t = t.getCause();
				}
			}
		}
	}

	// close connections
	private void disconnect() throws SQLException {
		if (rs != null && !rs.isClosed()) {
			rs.close();
		}
		if (statement != null && !statement.isClosed()) {
			statement.close();
		}
		if (jdbcConnection != null && !jdbcConnection.isClosed()) {
			jdbcConnection.close();
		}
	}

	// utils - end
}