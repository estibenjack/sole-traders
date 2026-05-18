import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import API_URL from '../../../utils/api';

const emptyForm = {
  title: '',
  description: '',
  pricing_type: 'fixed',
  base_price: '',
  estimated_duration_mins: ''
};

const ServicesTab = ({ trader, services, refresh, showToast }) => {
  const { token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const editServiceId = searchParams.get('edit')
    ? parseInt(searchParams.get('edit'))
    : null;
  const serviceToEdit = editServiceId
    ? services.find((s) => s.id === editServiceId)
    : null;

  const [addForm, setAddForm] = useState(emptyForm);
  const [editForm, setEditForm] = useState(
    serviceToEdit
      ? {
          title: serviceToEdit.title,
          description: serviceToEdit.description,
          pricing_type: serviceToEdit.pricing_type,
          base_price: parseFloat(serviceToEdit.base_price).toFixed(2),
          estimated_duration_mins: serviceToEdit.estimated_duration_mins || ''
        }
      : emptyForm
  );
  const [saving, setSaving] = useState(false);

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const handleAddChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    axios
      .post(
        `${API_URL}/services`,
        {
          trader_id: trader.id,
          title: addForm.title.trim(),
          description: addForm.description.trim(),
          pricing_type: addForm.pricing_type,
          base_price: parseFloat(addForm.base_price),
          estimated_duration_mins: addForm.estimated_duration_mins
            ? parseInt(addForm.estimated_duration_mins)
            : null
        },
        authHeader
      )
      .then(() => {
        setSaving(false);
        setAddForm(emptyForm);
        refresh();
        showToast('Service added successfully');
      })
      .catch(() => setSaving(false));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    axios
      .put(
        `${API_URL}/services/${editServiceId}`,
        {
          title: editForm.title.trim(),
          description: editForm.description.trim(),
          pricing_type: editForm.pricing_type,
          base_price: parseFloat(editForm.base_price),
          estimated_duration_mins: editForm.estimated_duration_mins
            ? parseInt(editForm.estimated_duration_mins)
            : null
        },
        authHeader
      )
      .then(() => {
        setSaving(false);
        setSearchParams({ tab: 'services' });
        refresh();
        showToast('Service updated successfully');
      })
      .catch(() => setSaving(false));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this service?')) return;
    axios
      .delete(`${API_URL}/services/${id}`, authHeader)
      .then(() => {
        refresh();
        showToast('Service deleted');
      });
  };

  const serviceForm = (form, handleChange, handleSubmit, isEdit) => (
    <form onSubmit={handleSubmit}>
      <div className="columns">
        <div className="column is-8">
          <div className="field">
            <label htmlFor={isEdit ? 'edit_title' : 'title'} className="label">
              Service title
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                id={isEdit ? 'edit_title' : 'title'}
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Boiler installation"
                required
              />
            </div>
          </div>
        </div>
        <div className="column is-4">
          <div className="field">
            <label
              htmlFor={isEdit ? 'edit_pricing_type' : 'pricing_type'}
              className="label"
            >
              Pricing type
            </label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  name="pricing_type"
                  id={isEdit ? 'edit_pricing_type' : 'pricing_type'}
                  value={form.pricing_type}
                  onChange={handleChange}
                  required
                >
                  <option value="fixed">Fixed price</option>
                  <option value="hourly">Hourly rate</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column is-8">
          <div className="field">
            <label
              htmlFor={isEdit ? 'edit_description' : 'description'}
              className="label"
            >
              Description
            </label>
            <div className="control">
              <textarea
                className="textarea"
                id={isEdit ? 'edit_description' : 'description'}
                name="description"
                rows="3"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe what's included..."
                required
              />
            </div>
          </div>
        </div>
        <div className="column is-4">
          <div className="field">
            <label
              htmlFor={isEdit ? 'edit_base_price' : 'base_price'}
              className="label"
            >
              Price (£)
            </label>
            <div className="control">
              <input
                type="number"
                className="input"
                id={isEdit ? 'edit_base_price' : 'base_price'}
                name="base_price"
                min="0.01"
                step="0.01"
                value={form.base_price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>
          </div>
          <div className="field">
            <label
              htmlFor={
                isEdit ? 'edit_estimated_duration_mins' : 'estimated_duration_mins'
              }
              className="label"
            >
              Est. duration (mins)
            </label>
            <div className="control">
              <input
                type="number"
                className="input"
                id={
                  isEdit
                    ? 'edit_estimated_duration_mins'
                    : 'estimated_duration_mins'
                }
                name="estimated_duration_mins"
                min="1"
                value={form.estimated_duration_mins}
                onChange={handleChange}
                placeholder="e.g. 120"
              />
            </div>
          </div>
        </div>
      </div>

      <button className="btn-primary" type="submit" disabled={saving}>
        <i className={`fa-solid ${isEdit ? 'fa-floppy-disk' : 'fa-plus'}`}></i>{' '}
        {isEdit
          ? saving
            ? 'Saving...'
            : 'Save changes'
          : saving
            ? 'Adding...'
            : 'Add service'}
      </button>
    </form>
  );

  return (
    <>
      {serviceToEdit ? (
        <div className="dash-card mb-4">
          <div className="dash-card-header">
            <h2 className="profile-section-title">Edit Service</h2>
            <button
              className="btn-outline-dark btn-sm"
              onClick={() => setSearchParams({ tab: 'services' })}
            >
              <i className="fa-solid fa-xmark"></i> Cancel
            </button>
          </div>
          {serviceForm(editForm, handleEditChange, handleEditSubmit, true)}
        </div>
      ) : (
        <div className="dash-card mb-4">
          <h2 className="profile-section-title">Add a Service</h2>
          {serviceForm(addForm, handleAddChange, handleAddSubmit, false)}
        </div>
      )}

      <div className="dash-card">
        <h2 className="profile-section-title">Your Services</h2>
        {services.length > 0 ? (
          <table className="table is-fullwidth dash-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Pricing</th>
                <th>Price</th>
                <th className="hide-mobile">Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>
                    <strong>{service.title}</strong>
                    <br />
                    <small className="hide-mobile">
                      {service.description.length > 60
                        ? service.description.substring(0, 60) + '...'
                        : service.description}
                    </small>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${service.pricing_type === 'hourly' ? 'pending' : 'confirmed'}`}
                    >
                      {service.pricing_type}
                    </span>
                  </td>
                  <td>£{parseFloat(service.base_price).toFixed(2)}</td>
                  <td className="hide-mobile">
                    {service.estimated_duration_mins
                      ? `${service.estimated_duration_mins} mins`
                      : '—'}
                  </td>
                  <td>
                    <div className="service-actions">
                      <button
                        className="btn-accept"
                        onClick={() =>
                          setSearchParams({ tab: 'services', edit: service.id })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => handleDelete(service.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-msg">
            <i className="fa-solid fa-briefcase"></i>
            <p>No services listed yet. Add your first service above.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ServicesTab;
