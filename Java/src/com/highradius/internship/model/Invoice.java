package com.highradius.internship.model;

import java.sql.Date;
import java.sql.Timestamp;

public class Invoice {
	private String businessCode;
	private String custNumber;
	private String nameCustomer;
	private Timestamp clearDate;
	private Double businessYear;
	private Double docId;
	private Date postingDate;
	private Date documentCreateDate;
	private Date dueInDate;
	private String invoiceCurrency;
	private String documentType;
	private Double postingId;
	private String areaBusiness;
	private Double totalOpenAmount;
	private Date baselineCreateDate;
	private String custPaymentTerms;
	private Double invoiceId;
	private Double isOpen;
	private String notes;

	public Double getBusinessYear() {
		return businessYear;
	}

	public void setBusinessYear(Double businessYear) {
		this.businessYear = businessYear;
	}

	public Double getPostingId() {
		return postingId;
	}

	public void setPostingId(Double postingId) {
		this.postingId = postingId;
	}

	public Double getTotalOpenAmount() {
		return totalOpenAmount;
	}

	public void setTotalOpenAmount(Double totalOpenAmount) {
		this.totalOpenAmount = totalOpenAmount;
	}

	public Double getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(Double invoiceId) {
		this.invoiceId = invoiceId;
	}

	public Double getIsOpen() {
		return isOpen;
	}

	public void setIsOpen(Double isOpen) {
		this.isOpen = isOpen;
	}

	public String getBusinessCode() {
		return businessCode;
	}

	public void setBusinessCode(String businessCode) {
		this.businessCode = businessCode;
	}

	public String getCustNumber() {
		return custNumber;
	}

	public void setCustNumber(String custNumber) {
		this.custNumber = custNumber;
	}

	public String getNameCustomer() {
		return nameCustomer;
	}

	public void setNameCustomer(String nameCustomer) {
		this.nameCustomer = nameCustomer;
	}

	public Timestamp getClearDate() {
		return clearDate;
	}

	public void setClearDate(Timestamp clearDate) {
		this.clearDate = clearDate;
	}

	public Double getDocId() {
		return docId;
	}

	public void setDocId(Double docId) {
		this.docId = docId;
	}

	public Date getPostingDate() {
		return postingDate;
	}

	public void setPostingDate(Date postingDate) {
		this.postingDate = postingDate;
	}

	public Date getDocumentCreateDate() {
		return documentCreateDate;
	}

	public void setDocumentCreateDate(Date documentCreateDate) {
		this.documentCreateDate = documentCreateDate;
	}

	public Date getDueInDate() {
		return dueInDate;
	}

	public void setDueInDate(Date dueInDate) {
		this.dueInDate = dueInDate;
	}

	public String getInvoiceCurrency() {
		return invoiceCurrency;
	}

	public void setInvoiceCurrency(String invoiceCurrency) {
		this.invoiceCurrency = invoiceCurrency;
	}

	public String getDocumentType() {
		return documentType;
	}

	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}

	public String getAreaBusiness() {
		return areaBusiness;
	}

	public void setAreaBusiness(String areaBusiness) {
		this.areaBusiness = areaBusiness;
	}

	public Date getBaselineCreateDate() {
		return baselineCreateDate;
	}

	public void setBaselineCreateDate(Date baselineCreateDate) {
		this.baselineCreateDate = baselineCreateDate;
	}

	public String getCustPaymentTerms() {
		return custPaymentTerms;
	}

	public void setCustPaymentTerms(String custPaymentTerms) {
		this.custPaymentTerms = custPaymentTerms;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

}
