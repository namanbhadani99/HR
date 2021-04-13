package com.highradius.internship.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.highradius.internship.dao.InvoiceDAO;
import com.highradius.internship.model.Invoice;

/**
 * Servlet implementation class InvoiceServlet
 */
@WebServlet("/")
public class InvoiceServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public InvoiceServlet() {
		super();
	}

	public void init(ServletConfig config) throws ServletException {
		System.out.println("----------Initializing app-------------");
		try {
			// comment this if not required
//			InvoiceDAO invoiceDAO = new InvoiceDAO();
//			invoiceDAO.loadCSVonStartup();
		} catch (Exception e) {
			e.printStackTrace();
			throw new ServletException(e);
		}
		System.out.println("----------App initialized successfully-------------");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// response.getWriter().append("Served at: ").append(request.getContextPath());
		// String action = request.getServletPath();

		String action = request.getPathInfo();
		System.out.println(action);
		try {
			switch (action) {
			case "/add":
				addInvoice(request, response);
				break;
			case "/delete":
				deleteInvoice(request, response);
				break;
			case "/search":
				searchInvoice(request, response);
				break;
			case "/update":
				updateInvoice(request, response);
				break;
			default:
				listInvoices(request, response);
				break;
			}
		} catch (Exception ex) {
			throw new ServletException(ex);
		}
	}

	public void listInvoices(HttpServletRequest request, HttpServletResponse response)
			throws SQLException, IOException {

		List<Invoice> invoiceList = new ArrayList<Invoice>();
		String pageCount = "0";
		if (request.getParameterMap().containsKey("page")) {
			pageCount = (request.getParameter("page").isEmpty()) ? "0" : request.getParameter("page");
		}

		try {
			InvoiceDAO invoiceDAO = new InvoiceDAO();
			invoiceList = invoiceDAO.listInvoices(pageCount);
		} catch (Exception e) {
			throw e;
		}
		setOutput(invoiceList, request, response);
		/*
		 * Gson gson = new Gson(); String data = gson.toJson(invoiceList); PrintWriter
		 * out = response.getWriter(); response.setContentType("application/json");
		 * response.setCharacterEncoding("UTF-8"); out.print(data); out.flush();
		 */
	}

	private void updateInvoice(HttpServletRequest request, HttpServletResponse response)
			throws SQLException, IOException {
		String docId = request.getParameter("docId");
		String totalOpenAmount = request.getParameter("totalOpenAmount");
		String notes = request.getParameter("notes");
		boolean isSuccess = false;
		try {
			InvoiceDAO invoiceDAO = new InvoiceDAO();
			isSuccess = invoiceDAO.updateInvoice(docId, totalOpenAmount, notes);
		} catch (Exception e) {
			throw e;
		}
		setOutput(isSuccess, request, response);
		/*
		 * Gson gson = new Gson(); String data = gson.toJson(isSuccess); PrintWriter out
		 * = response.getWriter(); response.setContentType("application/json");
		 * response.setCharacterEncoding("UTF-8"); out.print(data); out.flush();
		 */
	}

	private void searchInvoice(HttpServletRequest request, HttpServletResponse response)
			throws SQLException, IOException {
		String invoiceId = request.getParameter("invoiceId");
		List<Invoice> invoiceList = new ArrayList<Invoice>();
		try {
			InvoiceDAO invoiceDAO = new InvoiceDAO();
			invoiceList = invoiceDAO.searchInvoice(invoiceId);
		} catch (Exception e) {
			throw e;
		}
		setOutput(invoiceList, request, response);
		/*
		 * Gson gson = new Gson(); String data = gson.toJson(invoiceList); PrintWriter
		 * out = response.getWriter(); response.setContentType("application/json");
		 * response.setCharacterEncoding("UTF-8"); out.print(data); out.flush();
		 */
	}

	private void deleteInvoice(HttpServletRequest request, HttpServletResponse response)
			throws SQLException, IOException {
		String[] docList = (request.getParameter("docList")).split("\\,");
		boolean isSuccess = false;
		try {
			InvoiceDAO invoiceDAO = new InvoiceDAO();
			isSuccess = invoiceDAO.deleteInvoice(docList);
		} catch (Exception e) {
			throw e;
		}
		setOutput(isSuccess, request, response);
		/*
		 * Gson gson = new Gson(); String data = gson.toJson(isSuccess); PrintWriter out
		 * = response.getWriter(); response.setContentType("application/json");
		 * response.setCharacterEncoding("UTF-8"); out.print(data); out.flush();
		 */

	}

	private void addInvoice(HttpServletRequest request, HttpServletResponse response)
			throws SQLException, IOException, ParseException {
		Invoice inv = new Invoice();
		inv.setDocId(Double.parseDouble(request.getParameter("invoiceId")));
		inv.setNameCustomer(request.getParameter("nameCustomer"));
		inv.setCustNumber(request.getParameter("custNumber"));
		inv.setInvoiceId(Double.parseDouble(request.getParameter("invoiceId")));
		inv.setTotalOpenAmount(Double.parseDouble(request.getParameter("totalOpenAmount")));
		inv.setDueInDate(
				new Date(new SimpleDateFormat("yyyy-MM-dd").parse(request.getParameter("dueInDate")).getTime()));
		inv.setNotes(request.getParameter("notes"));

		boolean isSuccess = false;
		try {
			InvoiceDAO invoiceDAO = new InvoiceDAO();
			isSuccess = invoiceDAO.addInvoice(inv);
		} catch (Exception e) {
			throw e;
		}
		setOutput(isSuccess, request, response);
		/*
		 * Gson gson = new Gson(); String data = gson.toJson(isSuccess); PrintWriter out
		 * = response.getWriter(); response.setContentType("application/json");
		 * response.setCharacterEncoding("UTF-8"); out.print(data); out.flush();
		 */

	}

	private void setOutput(Object ret, HttpServletRequest request, HttpServletResponse response)
			throws SQLException, IOException {
		Gson gson = new Gson();
		String data = gson.toJson(ret);
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		out.print(data);
		out.flush();
	}

}