import React from 'react';
import './appaprovalcomponent.css';

// Purchase Approvals
export interface Approval {
  id: number;
  availableFunds: number;
  officeFunds: number;
  remainingFunds: number;
  dueDate: string;
}

export interface PurchaseApprovalsProps {
  title: string;
  approvals: Approval[];
  onBudgetCheck?: () => void;
  onViewAll?: () => void;
  onReject?: (id: number) => void;
  onApprove?: (id: number) => void;
}

export const PurchaseApprovals: React.FC<PurchaseApprovalsProps> = ({
  title,
  approvals,
  onBudgetCheck,
  onViewAll,
  onReject,
  onApprove
}) => {
  return (
    <div className="purchase-approvals-card">
      <div className="approvals-header">
        <h3 className="approvals-title">{title}</h3>
        <div className="approvals-actions">
          <button className="btn-budget-check" onClick={onBudgetCheck}>
            Budget Check
          </button>
          <button className="btn-view-all" onClick={onViewAll}>
            View All
          </button>
        </div>
      </div>

      <div className="approvals-table">
        <div className="approvals-table-header">
          <div className="table-col">Available Funds</div>
          <div className="table-col">Office Funds</div>
          <div className="table-col">Remaining Funds</div>
          <div className="table-col">Due Date</div>
          <div className="table-col">Actions</div>
        </div>

        <div className="approvals-table-body">
          {approvals.map((approval) => (
            <div key={approval.id} className="approval-row">
              <div className="table-col">
                <span className="col-label">Available Funds</span>
                <span className="col-value">${approval.availableFunds.toFixed(2)}</span>
              </div>
              <div className="table-col">
                <span className="col-label">Office Funds</span>
                <span className="col-value">${approval.officeFunds.toFixed(2)}</span>
              </div>
              <div className="table-col">
                <span className="col-label">Remaining Funds</span>
                <span className="col-value">${approval.remainingFunds.toFixed(2)}</span>
              </div>
              <div className="table-col">
                <span className="col-label">Due Date</span>
                <span className="col-value">{approval.dueDate}</span>
              </div>
              <div className="table-col action-buttons">
                <button
                  className="btn-reject"
                  onClick={() => onReject?.(approval.id)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Reject
                </button>
                <button
                  className="btn-approve"
                  onClick={() => onApprove?.(approval.id)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Approved List
export interface ApprovedItem {
  id: number;
  availableFunds: number;
  officeFunds: number;
  remainingFunds: number;
}

export interface ApprovedListProps {
  title: string;
  items: ApprovedItem[];
  onViewAll?: () => void;
}

export const ApprovedList: React.FC<ApprovedListProps> = ({
  title,
  items,
  onViewAll
}) => {
  return (
    <div className="approved-list-card">
      <div className="approved-header">
        <h3 className="approved-title">{title}</h3>
        <button className="btn-view-all" onClick={onViewAll}>
          View All
        </button>
      </div>

      <div className="approved-items">
        {items.map((item) => (
          <div key={item.id} className="approved-item">
            <div className="approved-checkmark">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="approved-details">
              <div className="approved-detail">
                <span className="detail-label">Available Funds</span>
                <span className="detail-value">${item.availableFunds.toFixed(2)}</span>
              </div>
              <div className="approved-detail">
                <span className="detail-label">Office Funds</span>
                <span className="detail-value">${item.officeFunds.toFixed(2)}</span>
              </div>
              <div className="approved-detail">
                <span className="detail-label">Remaining Funds</span>
                <span className="detail-value">${item.remainingFunds.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};